"""
AI Connect X — Hardened Application Configuration
"""
from pydantic import BaseSettings, validator
from typing import Optional, List
import logging

logger = logging.getLogger("uvicorn.error")

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./ai_connectx.db"

    # JWT Auth
    SECRET_KEY: str = "ai-connectx-jwt-signing-secret-placeholder-min-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    # AI Providers
    AI_PROVIDER: str = "gemini"  # "openai" or "gemini"
    OPENAI_API_KEY: Optional[str] = None
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # Email SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAIL_FROM: Optional[str] = None

    # App
    APP_NAME: str = "AI Connect X"
    APP_ENV: str = "production"
    DEBUG: bool = False
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"
    BACKEND_URL: str = "http://localhost:8000"

    # Rate Limiting (Requests per minute)
    RATE_LIMIT_AUTH_PER_MINUTE: int = 10
    RATE_LIMIT_AI_PER_MINUTE: int = 30
    RATE_LIMIT_DEFAULT_PER_MINUTE: int = 120

    @validator("SECRET_KEY")
    def validate_secret_key(cls, v, values):
        if v == "your-super-secret-key-change-in-production":
            raise ValueError("Insecure default SECRET_KEY detected! Set a secure random key in .env.")
        if len(v) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters long for cryptographic security.")
        return v

    def get_allowed_origins(self) -> List[str]:
        if not self.ALLOWED_ORIGINS:
            return ["http://localhost:5173"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
