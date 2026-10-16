"""Prospect routes — Pipeline management + qualification"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database import get_db
from app.models.prospect import Prospect
from app.models.company import Company
from app.models.contact import Contact
from app.models.campaign import Campaign
from app.models.user import User
from app.schemas.schemas import ProspectCreate, ProspectUpdate, ProspectOut
from app.services.auth import get_current_user
from app.services import ai_engine

router = APIRouter(prefix="/api/prospects", tags=["Prospects"])


@router.post("/", response_model=ProspectOut, status_code=status.HTTP_201_CREATED)
async def create_prospect(
    data: ProspectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify campaign and company exist
    campaign = await db.execute(select(Campaign).where(Campaign.id == data.campaign_id, Campaign.created_by == current_user.id))
    if not campaign.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Campaign not found")

    company = await db.execute(select(Company).where(Company.id == data.company_id, Company.owner_id == current_user.id))
    if not company.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Company not found")
    if data.contact_id is not None:
        contact = await db.execute(select(Contact).where(Contact.id == data.contact_id, Contact.owner_id == current_user.id, Contact.company_id == data.company_id))
        if not contact.scalar_one_or_none():
            raise HTTPException(status_code=404, detail="Contact not found")

    # Check duplicate
    existing = await db.execute(
        select(Prospect).where(
            Prospect.campaign_id == data.campaign_id,
            Prospect.company_id == data.company_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Company already in this campaign")

    prospect = Prospect(**data.dict())
    db.add(prospect)
    await db.flush()
    await db.refresh(prospect)
    return prospect


@router.get("/", response_model=List[ProspectOut])
async def list_prospects(
    campaign_id: int = None,
    status_filter: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = (
        select(Prospect)
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .where(Campaign.created_by == current_user.id)
        .order_by(Prospect.created_at.desc())
    )
    if campaign_id:
        query = query.where(Prospect.campaign_id == campaign_id)
    if status_filter:
        query = query.where(Prospect.status == status_filter)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{prospect_id}", response_model=ProspectOut)
async def get_prospect(
    prospect_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.contact))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    return prospect


@router.put("/{prospect_id}", response_model=ProspectOut)
async def update_prospect(
    prospect_id: int,
    data: ProspectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Prospect).join(Campaign).where(Prospect.id == prospect_id, Campaign.created_by == current_user.id))
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    if data.contact_id is not None:
        contact = await db.execute(
            select(Contact).where(
                Contact.id == data.contact_id,
                Contact.owner_id == current_user.id,
                Contact.company_id == prospect.company_id,
            )
        )
        if not contact.scalar_one_or_none():
            raise HTTPException(status_code=404, detail="Contact not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(prospect, key, value)
    await db.flush()
    await db.refresh(prospect)
    return prospect


@router.post("/{prospect_id}/qualify", response_model=ProspectOut)
async def qualify_prospect(
    prospect_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """AI-qualify a prospect for a campaign."""
    result = await db.execute(
        select(Prospect)
        .options(selectinload(Prospect.company), selectinload(Prospect.campaign))
        .join(Campaign, Prospect.campaign_id == Campaign.id)
        .where(Prospect.id == prospect_id, Campaign.created_by == current_user.id)
    )
    prospect = result.scalar_one_or_none()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")

    company_info = {
        "name": prospect.company.name,
        "industry": prospect.company.industry,
        "location": prospect.company.location,
        "size": prospect.company.size,
        "description": prospect.company.description,
        "technologies": prospect.company.technologies,
        "research_summary": prospect.company.research_summary,
    }
    campaign_info = {
        "name": prospect.campaign.name,
        "objective": prospect.campaign.objective,
        "collaboration_type": prospect.campaign.collaboration_type,
        "target_industry": prospect.campaign.target_industry,
        "target_location": prospect.campaign.target_location,
    }

    qualification = await ai_engine.qualify_prospect(company_info, campaign_info)

    prospect.qualification_score = qualification.get("qualification_score")
    prospect.qualification_reasoning = qualification.get("qualification_reasoning")
    prospect.collaboration_ideas = qualification.get("collaboration_ideas")
    prospect.status = "qualified"

    await db.flush()
    await db.refresh(prospect)
    return prospect
