"""
AI Connect X — Secure Admin Seeding Script
"""
import asyncio
import os
import secrets
import string
import sys

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base, async_session
from app.models.user import User
from app.services.auth import get_password_hash
from sqlalchemy.future import select


def generate_secure_password(length: int = 16) -> str:
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    while True:
        password = "".join(secrets.choice(alphabet) for _ in range(length))
        if (
            any(c.islower() for c in password)
            and any(c.isupper() for c in password)
            and any(c.isdigit() for c in password)
            and any(c in "!@#$%^&*" for c in password)
        ):
            return password


async def seed():
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@aiconnectx.club").strip().lower()
    admin_password = os.environ.get("ADMIN_PASSWORD")

    async with async_session() as session:
        result = await session.execute(select(User).where(User.email == admin_email))
        existing_user = result.scalars().first()

        if existing_user:
            print(f"Admin account for {admin_email} already exists (ID: {existing_user.id}).")
        else:
            if not admin_password:
                admin_password = generate_secure_password(16)
                print("Generated cryptographically secure admin password.")

            user = User(
                name="System Administrator",
                email=admin_email,
                hashed_password=get_password_hash(admin_password),
                role="admin",
                is_active=True,
            )
            session.add(user)
            await session.commit()
            print("==================================================")
            print("Admin account initialized successfully:")
            print(f"  Email:    {admin_email}")
            print(f"  Password: {admin_password}")
            print("IMPORTANT: Save these credentials securely in your password manager.")
            print("==================================================")


if __name__ == "__main__":
    asyncio.run(seed())
