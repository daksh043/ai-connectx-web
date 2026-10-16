"""AI assistant and approval-first automation workspace routes."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.automation import Automation
from app.models.user import User
from app.schemas.schemas import (
    AssistantChatRequest,
    AssistantChatResponse,
    AutomationCreate,
    AutomationGenerateRequest,
    AutomationOut,
    AutomationUpdate,
)
from app.services.auth import get_current_user
from app.services import ai_engine
from google.api_core.exceptions import ResourceExhausted

router = APIRouter(prefix="/api/workspace", tags=["Workspace"])


@router.post("/assistant/chat", response_model=AssistantChatResponse)
async def assistant_chat(
    data: AssistantChatRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        return await ai_engine.assistant_chat(data.message, data.context)
    except ResourceExhausted as error:
        raise HTTPException(status_code=429, detail="AI provider quota exceeded. Wait for the quota window to reset or check your Gemini billing and limits.") from error
    except Exception as error:
        raise HTTPException(status_code=502, detail="AI provider request failed. Check the configured provider key and model.") from error


@router.get("/automations", response_model=List[AutomationOut])
async def list_automations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Automation).where(Automation.created_by == current_user.id).order_by(Automation.updated_at.desc(), Automation.created_at.desc()))
    return result.scalars().all()


@router.post("/automations", response_model=AutomationOut, status_code=status.HTTP_201_CREATED)
async def create_automation(
    data: AutomationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    automation = Automation(**data.dict(), created_by=current_user.id)
    db.add(automation)
    await db.flush()
    await db.refresh(automation)
    return automation


@router.post("/automations/generate", response_model=AutomationCreate)
async def generate_automation(
    data: AutomationGenerateRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        draft = await ai_engine.generate_automation(data.prompt)
    except ResourceExhausted as error:
        raise HTTPException(status_code=429, detail="AI provider quota exceeded. Wait for the quota window to reset or check your Gemini billing and limits.") from error
    except Exception as error:
        raise HTTPException(status_code=502, detail="AI provider request failed. Check the configured provider key and model.") from error
    return AutomationCreate(**draft)


@router.patch("/automations/{automation_id}", response_model=AutomationOut)
async def update_automation(
    automation_id: int,
    data: AutomationUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Automation).where(Automation.id == automation_id, Automation.created_by == current_user.id))
    automation = result.scalar_one_or_none()
    if not automation:
        raise HTTPException(status_code=404, detail="Automation not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(automation, key, value)
    await db.flush()
    await db.refresh(automation)
    return automation


@router.delete("/automations/{automation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_automation(
    automation_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Automation).where(Automation.id == automation_id, Automation.created_by == current_user.id))
    automation = result.scalar_one_or_none()
    if not automation:
        raise HTTPException(status_code=404, detail="Automation not found")
    await db.delete(automation)
