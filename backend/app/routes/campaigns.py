"""Campaign routes — CRUD + analytics"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List
from app.database import get_db
from app.models.campaign import Campaign
from app.models.prospect import Prospect
from app.models.message import Message
from app.models.conversation import Conversation
from app.models.user import User
from app.schemas.schemas import CampaignCreate, CampaignUpdate, CampaignOut, CampaignAnalytics
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/campaigns", tags=["Campaigns"])


@router.post("/", response_model=CampaignOut, status_code=status.HTTP_201_CREATED)
async def create_campaign(
    data: CampaignCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    campaign = Campaign(**data.dict(), created_by=current_user.id)
    db.add(campaign)
    await db.flush()
    await db.refresh(campaign)
    return campaign


@router.get("/", response_model=List[CampaignOut])
async def list_campaigns(
    status_filter: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Campaign).where(Campaign.created_by == current_user.id).order_by(Campaign.created_at.desc())
    if status_filter:
        query = query.where(Campaign.status == status_filter)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{campaign_id}", response_model=CampaignOut)
async def get_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id, Campaign.created_by == current_user.id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@router.put("/{campaign_id}", response_model=CampaignOut)
async def update_campaign(
    campaign_id: int,
    data: CampaignUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id, Campaign.created_by == current_user.id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    for key, value in data.dict(exclude_unset=True).items():
        setattr(campaign, key, value)
    
    await db.flush()
    await db.refresh(campaign)
    return campaign


@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id, Campaign.created_by == current_user.id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    await db.delete(campaign)


@router.get("/{campaign_id}/analytics", response_model=CampaignAnalytics)
async def get_campaign_analytics(
    campaign_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id, Campaign.created_by == current_user.id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    # Count prospects
    prospects_result = await db.execute(
        select(func.count(Prospect.id)).where(Prospect.campaign_id == campaign_id)
    )
    total_prospects = prospects_result.scalar() or 0

    companies_result = await db.execute(
        select(func.count(func.distinct(Prospect.company_id))).where(Prospect.campaign_id == campaign_id)
    )
    companies_discovered = companies_result.scalar() or 0

    contacts_result = await db.execute(
        select(func.count(func.distinct(Prospect.contact_id))).where(Prospect.campaign_id == campaign_id)
    )
    contacts_discovered = contacts_result.scalar() or 0

    # Count by status
    status_result = await db.execute(
        select(Prospect.status, func.count(Prospect.id))
        .where(Prospect.campaign_id == campaign_id)
        .group_by(Prospect.status)
    )
    pipeline = {row[0]: row[1] for row in status_result.all()}

    # Count messages by channel and status for the draft and approval metrics.
    message_result = await db.execute(
        select(Message.channel, Message.status, func.count(Message.id))
        .join(Prospect, Message.prospect_id == Prospect.id)
        .where(Prospect.campaign_id == campaign_id)
        .group_by(Message.channel, Message.status)
    )
    message_counts = {(row[0], row[1]): row[2] for row in message_result.all()}
    draft_statuses = {"draft", "pending_approval"}
    linkedin_drafts = sum(
        count for (channel, message_status), count in message_counts.items()
        if channel == "linkedin" and message_status in draft_statuses
    )
    emails_drafted = sum(
        count for (channel, message_status), count in message_counts.items()
        if channel == "email" and message_status in draft_statuses
    )
    messages_approved = sum(
        count for (_, message_status), count in message_counts.items()
        if message_status in {"approved", "sent", "delivered"}
    )
    sent = sum(
        count for (_, message_status), count in message_counts.items()
        if message_status in {"sent", "delivered"}
    )

    # Count inbound replies and their AI-classified outcomes.
    conversation_result = await db.execute(
        select(Conversation.direction, Conversation.sentiment, func.count(Conversation.id))
        .join(Prospect, Conversation.prospect_id == Prospect.id)
        .where(Prospect.campaign_id == campaign_id)
        .group_by(Conversation.direction, Conversation.sentiment)
    )
    conversation_counts = {(row[0], row[1]): row[2] for row in conversation_result.all()}
    replies = sum(
        count for (direction, _), count in conversation_counts.items()
        if direction == "inbound"
    )
    positive_responses = sum(
        count for (direction, sentiment), count in conversation_counts.items()
        if direction == "inbound" and sentiment in {"interested", "meeting_requested"}
    )
    meetings = conversation_counts.get(("inbound", "meeting_requested"), 0)

    qualified_stages = {
        "qualified", "contacted", "follow_up", "replied", "discussion", "collaboration", "completed",
    }
    qualified_prospects = sum(count for stage, count in pipeline.items() if stage in qualified_stages)

    return CampaignAnalytics(
        campaign_id=campaign_id,
        campaign_name=campaign.name,
        total_prospects=total_prospects,
        companies_discovered=companies_discovered,
        contacts_discovered=contacts_discovered,
        qualified_prospects=qualified_prospects,
        linkedin_drafts=linkedin_drafts,
        emails_drafted=emails_drafted,
        messages_approved=messages_approved,
        messages_sent=sent,
        replies=replies,
        positive_responses=positive_responses,
        meetings=meetings,
        pipeline_breakdown=pipeline,
    )
