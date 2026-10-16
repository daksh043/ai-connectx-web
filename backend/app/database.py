"""
AI Connect X — Database Engine & Session
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import inspect, text
from sqlalchemy.orm import DeclarativeBase
from app.config import settings


engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db():
    """Dependency that yields an async database session."""
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db():
    """Create tables and safely assign ownership to legacy CRM data."""
    async with engine.begin() as conn:
        from app.models import user, company, contact, campaign, prospect, message, conversation, followup, automation  # noqa
        await conn.run_sync(Base.metadata.create_all)
        await conn.run_sync(_migrate_ownership)


def _migrate_ownership(connection):
    inspector = inspect(connection)
    tables = set(inspector.get_table_names())
    if "users" not in tables:
        return

    # create_all does not add columns to tables created by earlier versions.
    for table in ("companies", "contacts"):
        if table in tables and "owner_id" not in {column["name"] for column in inspector.get_columns(table)}:
            connection.execute(text(f"ALTER TABLE {table} ADD COLUMN owner_id INTEGER REFERENCES users(id)"))
            inspector.clear_cache()

    if "campaigns" not in tables:
        return
    user_columns = {column["name"] for column in inspector.get_columns("users")}
    active_clause = "WHERE is_active IS NULL OR is_active = 1" if "is_active" in user_columns else ""
    owner = connection.execute(text(f"SELECT id FROM users {active_clause} ORDER BY id LIMIT 1")).scalar()
    has_data = any(
        "id" in {column["name"] for column in inspector.get_columns(table)}
        and connection.execute(text(f"SELECT 1 FROM {table} LIMIT 1")).first()
        for table in ("campaigns", "companies", "contacts", "automations") if table in tables
    )
    if has_data and owner is None:
        raise RuntimeError("Cannot migrate private CRM ownership: existing records have no user account to own them")
    if owner is not None:
        connection.execute(text("UPDATE campaigns SET created_by = :owner WHERE created_by IS NULL"), {"owner": owner})
        if "automations" in tables and "created_by" in {column["name"] for column in inspector.get_columns("automations")}:
            connection.execute(text("UPDATE automations SET created_by = :owner WHERE created_by IS NULL"), {"owner": owner})
        if "companies" in tables:
            connection.execute(text("UPDATE companies SET owner_id = :owner WHERE owner_id IS NULL"), {"owner": owner})
        if "contacts" in tables:
            connection.execute(text("UPDATE contacts SET owner_id = :owner WHERE owner_id IS NULL"), {"owner": owner})

    # A CRM row referenced by campaigns belonging to several accounts must be
    # copied for each campaign owner before the API starts enforcing privacy.
    if "prospects" in tables and {"campaign_id", "company_id"}.issubset({c["name"] for c in inspector.get_columns("prospects")}):
        campaigns = {row[0]: row[1] for row in connection.execute(text("SELECT id, created_by FROM campaigns"))}
        clones = {}
        for prospect_id, campaign_id, company_id, contact_id in connection.execute(
            text("SELECT id, campaign_id, company_id, contact_id FROM prospects")
        ).all():
            campaign_owner = campaigns.get(campaign_id)
            if campaign_owner is None:
                continue
            company_id = _copy_owned_row(connection, inspector, "companies", company_id, campaign_owner, clones)
            values = {"company_id": company_id, "prospect_id": prospect_id}
            assignment = "company_id = :company_id"
            if contact_id is not None and "contacts" in tables:
                contact_id = _copy_owned_row(connection, inspector, "contacts", contact_id, campaign_owner, clones)
                connection.execute(
                    text("UPDATE contacts SET company_id = :company_id WHERE id = :contact_id"),
                    {"company_id": company_id, "contact_id": contact_id},
                )
                assignment += ", contact_id = :contact_id"
                values["contact_id"] = contact_id
            connection.execute(text(f"UPDATE prospects SET {assignment} WHERE id = :prospect_id"), values)


def _copy_owned_row(connection, inspector, table, row_id, owner_id, clones):
    if row_id is None or table not in inspector.get_table_names():
        return row_id
    columns = [column["name"] for column in inspector.get_columns(table)]
    row = connection.execute(text(f"SELECT * FROM {table} WHERE id = :row_id"), {"row_id": row_id}).mappings().first()
    if row is None:
        return row_id
    if "owner_id" not in columns or row["owner_id"] == owner_id:
        return row_id
    key = (table, row_id, owner_id)
    if key in clones:
        return clones[key]
    values = {column: row[column] for column in columns if column != "id"}
    values["owner_id"] = owner_id
    names = ", ".join(values)
    binds = ", ".join(f":{name}" for name in values)
    new_id = connection.execute(text(f"INSERT INTO {table} ({names}) VALUES ({binds}) RETURNING id"), values).scalar_one()
    clones[key] = new_id
    return new_id
