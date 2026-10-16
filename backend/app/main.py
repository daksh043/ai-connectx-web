"""
AI Connect X — Hardened Main Application Entry Point
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.middleware import SecurityHeadersMiddleware, RateLimiterMiddleware
from app.routes import (
    admin,
    auth,
    campaigns,
    companies,
    contacts,
    prospects,
    ai,
    outreach,
    dashboard,
    workspace,
)

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database tables on startup."""
    await init_db()
    yield


# In production (DEBUG=False), docs are disabled or kept strictly authenticated
app = FastAPI(
    title="AI Connect X API",
    description="AI-powered B2B collaboration discovery and outreach platform",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan,
)

# 1. Security Headers Middleware (Outer layer)
app.add_middleware(SecurityHeadersMiddleware)

# 2. Rate Limiting Middleware (Protects against brute force and DDoS)
app.add_middleware(RateLimiterMiddleware)

# 3. Hardened CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    max_age=600,
)


# Global Exception Handler — Prevents leaking stack traces or internal DB errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled server exception at %s: %s", request.url.path, str(exc), exc_info=True)
    if settings.DEBUG:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": str(exc), "type": type(exc).__name__},
        )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please contact the administrator."},
    )


# Register all route modules
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(campaigns.router)
app.include_router(companies.router)
app.include_router(contacts.router)
app.include_router(prospects.router)
app.include_router(ai.router)
app.include_router(outreach.router)
app.include_router(dashboard.router)
app.include_router(workspace.router)


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": "1.0.0",
        "status": "running",
        "env": settings.APP_ENV,
        "secure": True,
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
