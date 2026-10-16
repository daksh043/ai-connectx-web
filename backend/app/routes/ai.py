"""AI routes — Message generation, collaboration ideas, quality check, reply classification"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models.prospect import Prospect
from app.models.company import Company
from app.models.message import Message
from app.models.user import User
from app.models.campaign import Campaign
from app.schemas.schemas import (
    AICollaborationIdeasRequest, AILinkedInMessageRequest,
    AIEmailRequest, AIFollowUpRequest, AIReplyRequest,
    MessageOut,
)
from app.services.auth import get_current_user
from app.services import ai_engine

router = APIRouter(prefix="/api/ai", tags=["AI Engine"])


@router.post("/collaboration-ideas")
async def get_collaboration_ideas(
    data: AICollaborationIdeasRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Company).where(Company.id == data.company_id, Company.owner_id == current_user.id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    company_info = {
        "name": company.name,
        "industry": company.industry,
        "location": company.location,
        "description": company.description,
        "technologies": company.technologies,
        "research_summary": company.research_summary,
    }

    ideas = await ai_engine.generate_collaboration_ideas(company_info, data.collaboration_type)
    return {"ideas": ideas}


@router.post("/linkedin-message", response_model=MessageOut)
async def generate_linkedin_message(
    data: AILinkedInMessageRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    if not prospect.contact:
        raise HTTPException(status_code=400, detail="Prospect has no contact assigned")

    company_info = {
        "name": prospect.company.name,
        "industry": prospect.company.industry,
        "description": prospect.company.description,
        "research_summary": prospect.company.research_summary,
    }
    contact_info = {
        "name": prospect.contact.name,
        "title": prospect.contact.title,
        "linkedin_url": prospect.contact.linkedin_url,
    }

    body = await ai_engine.generate_linkedin_message(
        company_info, contact_info, data.collaboration_idea, data.tone
    )

    # Quality check
    quality = await ai_engine.check_message_quality(body, {**company_info, **contact_info})

    # Save as draft
    message = Message(
        prospect_id=data.prospect_id,
        channel="linkedin",
        body=body,
        quality_check=quality,
        status="draft",
    )
    db.add(message)
    await db.flush()
    await db.refresh(message)

    # Update prospect status
    if prospect.status == "qualified":
        prospect.status = "contacted"
        await db.flush()

    return message


@router.post("/email", response_model=MessageOut)
async def generate_email(
    data: AIEmailRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    if not prospect.contact:
        raise HTTPException(status_code=400, detail="Prospect has no contact assigned")

    company_info = {
        "name": prospect.company.name,
        "industry": prospect.company.industry,
        "description": prospect.company.description,
        "research_summary": prospect.company.research_summary,
    }
    contact_info = {
        "name": prospect.contact.name,
        "title": prospect.contact.title,
        "business_email": prospect.contact.business_email,
    }

    email_data = await ai_engine.generate_email(
        company_info, contact_info, data.collaboration_idea, data.tone
    )

    quality = await ai_engine.check_message_quality(
        email_data.get("body", ""), {**company_info, **contact_info}
    )

    message = Message(
        prospect_id=data.prospect_id,
        channel="email",
        subject=email_data.get("subject"),
        body=email_data.get("body", ""),
        quality_check=quality,
        status="draft",
    )
    db.add(message)
    await db.flush()
    await db.refresh(message)
    return message


@router.post("/followup", response_model=MessageOut)
async def generate_followup(
    data: AIFollowUpRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")

    # Get previous messages for context
    prev_msgs = await db.execute(
        select(Message)
        .where(Message.prospect_id == data.prospect_id)
        .order_by(Message.created_at)
    )
    previous = [{"channel": m.channel, "body": m.body, "sent_at": str(m.sent_at)} for m in prev_msgs.scalars().all()]

    company_info = {"name": prospect.company.name, "industry": prospect.company.industry}
    contact_info = {"name": prospect.contact.name if prospect.contact else "Unknown", "title": prospect.contact.title if prospect.contact else ""}

    body = await ai_engine.generate_followup(
        company_info, contact_info, previous, data.followup_number
    )

    message = Message(
        prospect_id=data.prospect_id,
        channel="email",
        body=body,
        message_type="followup",
        status="draft",
    )
    db.add(message)
    await db.flush()
    await db.refresh(message)
    return message


@router.post("/classify-reply")
async def classify_reply(
    data: AIReplyRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == data.prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")

    context = {
        "company": prospect.company.name if prospect.company else "",
        "contact": prospect.contact.name if prospect.contact else "",
    }

    classification = await ai_engine.classify_reply(data.inbound_message, context)
    return classification
