"""
AI Connect X — Dedicated Admin Router (Role-Protected)
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.user import User
from app.models.company import Company
from app.models.campaign import Campaign
from app.models.prospect import Prospect
from app.models.message import Message
from app.schemas.schemas import UserOut
from app.services.auth import require_role
from app.config import settings

# Enforce strict admin role requirement across all routes in this router
router = APIRouter(
    prefix="/api/admin",
    tags=["Administration"],
    dependencies=[Depends(require_role("admin"))],
)


class RoleUpdateRequest(BaseModel):
    role: str = Field(..., regex="^(admin|team|reviewer)$")


class StatusUpdateRequest(BaseModel):
    is_active: bool


class SecurityAuditReport(BaseModel):
    app_env: str
    debug_mode: bool
    secret_key_length: int
    allowed_origins: List[str]
    rate_limits: dict
    total_users: int
    active_users: int
    admin_count: int
    total_companies: int
    total_campaigns: int
    total_prospects: int
    total_messages: int


@router.get("/users", response_model=List[UserOut])
async def list_all_users(
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    """Admin-only: List all registered users across the platform."""
    query = select(User).order_by(User.id.asc())
    if role:
        query = query.where(User.role == role)
    if is_active is not None:
        query = query.where(User.is_active == is_active)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.patch("/users/{user_id}/role", response_model=UserOut)
async def update_user_role(
    user_id: int,
    data: RoleUpdateRequest,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    """Admin-only: Promote or demote user roles."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.id == current_admin.id and data.role != "admin":
        raise HTTPException(
            status_code=400,
            detail="Cannot demote your own admin account. Have another admin change your role.",
        )

    user.role = data.role
    await db.flush()
    await db.refresh(user)
    return user


@router.patch("/users/{user_id}/status", response_model=UserOut)
async def update_user_status(
    user_id: int,
    data: StatusUpdateRequest,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    """Admin-only: Activate or suspend user accounts."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.id == current_admin.id and not data.is_active:
        raise HTTPException(
            status_code=400,
            detail="Cannot deactivate your own admin account.",
        )

    user.is_active = data.is_active
    await db.flush()
    await db.refresh(user)
    return user


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    """Admin-only: Permanently delete a user."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.id == current_admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account.")

    await db.delete(user)


@router.get("/security-audit", response_model=SecurityAuditReport)
async def get_security_audit_report(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    """Admin-only: Comprehensive platform security posture and audit summary."""
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0
    active_users = (await db.execute(select(func.count(User.id)).where(User.is_active == True))).scalar() or 0
    admin_count = (await db.execute(select(func.count(User.id)).where(User.role == "admin"))).scalar() or 0

    total_companies = (await db.execute(select(func.count(Company.id)))).scalar() or 0
    total_campaigns = (await db.execute(select(func.count(Campaign.id)))).scalar() or 0
    total_prospects = (await db.execute(select(func.count(Prospect.id)))).scalar() or 0
    total_messages = (await db.execute(select(func.count(Message.id)))).scalar() or 0

    return SecurityAuditReport(
        app_env=settings.APP_ENV,
        debug_mode=settings.DEBUG,
        secret_key_length=len(settings.SECRET_KEY),
        allowed_origins=settings.get_allowed_origins(),
        rate_limits={
            "auth_per_minute": settings.RATE_LIMIT_AUTH_PER_MINUTE,
            "ai_per_minute": settings.RATE_LIMIT_AI_PER_MINUTE,
            "default_per_minute": settings.RATE_LIMIT_DEFAULT_PER_MINUTE,
        },
        total_users=total_users,
        active_users=active_users,
        admin_count=admin_count,
        total_companies=total_companies,
        total_campaigns=total_campaigns,
        total_prospects=total_prospects,
        total_messages=total_messages,
    )
