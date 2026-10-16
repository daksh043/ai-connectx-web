"""Outreach routes — Message approval, sending, and conversation tracking"""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database import get_db
from app.models.message import Message
from app.models.prospect import Prospect
from app.models.campaign import Campaign
from app.models.conversation import Conversation
from app.models.followup import FollowUp
from app.models.user import User
from app.schemas.schemas import MessageOut, ConversationCreate, ConversationOut, FollowUpOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/outreach", tags=["Outreach"])


# ─── Message Management ─────────────────────────────────────────

@router.get("/messages", response_model=List[MessageOut])
async def list_messages(
    prospect_id: int = None,
    status_filter: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Message).join(Prospect).join(Campaign).where(Campaign.created_by == current_user.id).order_by(Message.created_at.desc())
    if prospect_id:
        query = query.where(Message.prospect_id == prospect_id)
    if status_filter:
        if status_filter == "sent":
            query = query.where(Message.status.in_(["sent", "delivered"]))
        else:
            query = query.where(Message.status == status_filter)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/messages/{message_id}", response_model=MessageOut)
async def get_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Message).join(Prospect).join(Campaign).where(Message.id == message_id, Campaign.created_by == current_user.id))
    message = result.scalar_one_or_none()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.put("/messages/{message_id}", response_model=MessageOut)
async def update_message(
    message_id: int,
    body: str = None,
    subject: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Message).join(Prospect).join(Campaign).where(Message.id == message_id, Campaign.created_by == current_user.id))
    message = result.scalar_one_or_none()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if body:
        message.body = body
    if subject:
        message.subject = subject
    await db.flush()
    await db.refresh(message)
    return message


# ─── Approval Workflow ───────────────────────────────────────────

@router.post("/approve/{message_id}", response_model=MessageOut)
async def approve_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Message).join(Prospect).join(Campaign).where(Message.id == message_id, Campaign.created_by == current_user.id))
    message = result.scalar_one_or_none()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if message.status not in ("draft", "pending_approval"):
        raise HTTPException(status_code=400, detail=f"Cannot approve message with status '{message.status}'")

    message.status = "approved"
    message.approved_by = current_user.id
    message.approved_at = datetime.now(timezone.utc)
    await db.flush()
    await db.refresh(message)
    return message


@router.post("/reject/{message_id}", response_model=MessageOut)
async def reject_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Message).join(Prospect).join(Campaign).where(Message.id == message_id, Campaign.created_by == current_user.id))
    message = result.scalar_one_or_none()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    message.status = "draft"
    await db.flush()
    await db.refresh(message)
    return message


@router.post("/send/{message_id}", response_model=MessageOut)
async def send_message(
    message_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Message).join(Prospect).join(Campaign).where(Message.id == message_id, Campaign.created_by == current_user.id))
    message = result.scalar_one_or_none()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if message.status != "approved":
        raise HTTPException(status_code=400, detail="Message must be approved before sending")

    # Mark as sent (actual sending would integrate with LinkedIn/email APIs)
    message.status = "sent"
    message.sent_at = datetime.now(timezone.utc)

    # Record in conversations
    conv = Conversation(
        prospect_id=message.prospect_id,
        channel=message.channel,
        message=message.body,
        direction="outbound",
    )
    db.add(conv)

    # Update prospect status
    prospect_result = await db.execute(select(Prospect).join(Campaign).where(Prospect.id == message.prospect_id, Campaign.created_by == current_user.id))
    prospect = prospect_result.scalar_one_or_none()
    if prospect and prospect.status in ("qualified", "discovered", "researched"):
        prospect.status = "contacted"

    await db.flush()
    await db.refresh(message)
    return message


# ─── Conversations ───────────────────────────────────────────────

@router.get("/conversations", response_model=List[ConversationOut])
async def list_conversations(
    prospect_id: int = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Conversation).join(Prospect).join(Campaign).where(Campaign.created_by == current_user.id).order_by(Conversation.timestamp.desc())
    if prospect_id:
        query = query.where(Conversation.prospect_id == prospect_id)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/conversations", response_model=ConversationOut)
async def add_conversation(
    data: ConversationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    prospect_result = await db.execute(select(Prospect).join(Campaign).where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id))
    if not prospect_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Prospect not found")
    conv = Conversation(**data.dict())
    db.add(conv)

    # If inbound, update prospect status
    if data.direction == "inbound":
        prospect_result = await db.execute(select(Prospect).join(Campaign).where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id))
        prospect = prospect_result.scalar_one_or_none()
        if prospect:
            prospect.status = "replied"

    await db.flush()
    await db.refresh(conv)
    return conv


# ─── Follow-ups ──────────────────────────────────────────────────

@router.get("/followups", response_model=List[FollowUpOut])
async def list_followups(
    prospect_id: int = None,
    status_filter: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(FollowUp).join(Prospect).join(Campaign).where(Campaign.created_by == current_user.id).order_by(FollowUp.scheduled_at)
    if prospect_id:
        query = query.where(FollowUp.prospect_id == prospect_id)
    if status_filter:
        query = query.where(FollowUp.status == status_filter)
    result = await db.execute(query)
    return result.scalars().all()
