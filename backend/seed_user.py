import asyncio
import os
import sys

# Add the backend directory to Python path so we can import 'app'
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base, async_session
from app.models.user import User
from app.services.auth import get_password_hash
from sqlalchemy.future import select

async def seed():
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Add the admin user
    async with async_session() as session:
        result = await session.execute(select(User).where(User.email == "admin@example.com"))
        existing_user = result.scalars().first()
        
        if existing_user:
            print("Admin user already exists.")
        else:
            user = User(
                name="Admin User",
                email="admin@example.com",
                hashed_password=get_password_hash("password123"),
                role="admin",
                is_active=True
            )
            session.add(user)
            await session.commit()
            print("Admin user created successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
