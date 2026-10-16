"""Company routes — CRUD, discovery, research"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models.company import Company
from app.models.user import User
from app.schemas.schemas import CompanyCreate, CompanyOut, CompanyDiscoverRequest
from app.services.auth import get_current_user
from app.services import ai_engine

router = APIRouter(prefix="/api/companies", tags=["Companies"])


@router.post("/", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def create_company(
    data: CompanyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    company = Company(**data.dict(), owner_id=current_user.id)
    db.add(company)
    await db.flush()
    await db.refresh(company)
    return company


@router.get("/", response_model=List[CompanyOut])
async def list_companies(
    industry: str = None,
    location: str = None,
    search: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Company).where(Company.owner_id == current_user.id).order_by(Company.created_at.desc())
    if industry:
        query = query.where(Company.industry.ilike(f"%{industry}%"))
    if location:
        query = query.where(Company.location.ilike(f"%{location}%"))
    if search:
        query = query.where(Company.name.ilike(f"%{search}%"))
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{company_id}", response_model=CompanyOut)
async def get_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Company).where(Company.id == company_id, Company.owner_id == current_user.id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@router.put("/{company_id}", response_model=CompanyOut)
async def update_company(
    company_id: int,
    data: CompanyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Company).where(Company.id == company_id, Company.owner_id == current_user.id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(company, key, value)
    await db.flush()
    await db.refresh(company)
    return company


@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Company).where(Company.id == company_id, Company.owner_id == current_user.id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    await db.delete(company)


@router.post("/discover", response_model=List[CompanyOut])
async def discover_companies(
    data: CompanyDiscoverRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Use AI to discover companies matching criteria."""
    criteria = data.dict()
    ai_companies = await ai_engine.discover_companies(criteria)

    created = []
    for c in ai_companies:
        # Check if company already exists
        existing = await db.execute(select(Company).where(Company.name == c.get("name", ""), Company.owner_id == current_user.id))
        if existing.scalar_one_or_none():
            continue

        company = Company(
            name=c.get("name", "Unknown"),
            website=c.get("website"),
            industry=c.get("industry"),
            location=c.get("location"),
            size=c.get("size"),
            description=c.get("description"),
            technologies=c.get("technologies"),
            relevance_reasoning=c.get("why_relevant"),
            source="ai_discovery",
            owner_id=current_user.id,
        )
        db.add(company)
        await db.flush()
        await db.refresh(company)
        created.append(company)
    
    return created


@router.post("/{company_id}/research", response_model=CompanyOut)
async def research_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate AI research brief for a company."""
    result = await db.execute(select(Company).where(Company.id == company_id, Company.owner_id == current_user.id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    company_info = {
        "name": company.name,
        "website": company.website,
        "industry": company.industry,
        "location": company.location,
        "size": company.size,
        "description": company.description,
        "technologies": company.technologies,
    }

    research = await ai_engine.research_company(company.name, company_info)

    company.research_summary = research.get("research_summary")
    company.relevance_score = research.get("relevance_score")
    company.relevance_reasoning = research.get("relevance_reasoning")
    company.collaboration_areas = research.get("collaboration_areas")
    if research.get("technologies"):
        company.technologies = research.get("technologies")

    await db.flush()
    await db.refresh(company)
    return company
