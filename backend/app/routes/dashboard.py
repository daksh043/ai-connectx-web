"""Dashboard routes — Stats and analytics overview"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.company import Company
from app.models.contact import Contact
from app.models.campaign import Campaign
from app.models.prospect import Prospect
from app.models.message import Message
from app.models.conversation import Conversation
from app.models.followup import FollowUp
from app.models.user import User
from app.schemas.schemas import DashboardStats
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Counts
    companies = (await db.execute(select(func.count(Company.id)).where(Company.owner_id == current_user.id))).scalar() or 0
    contacts = (await db.execute(select(func.count(Contact.id)).where(Contact.owner_id == current_user.id))).scalar() or 0
    campaigns = (await db.execute(select(func.count(Campaign.id)).where(Campaign.created_by == current_user.id))).scalar() or 0
    active_campaigns = (await db.execute(
        select(func.count(Campaign.id)).where(Campaign.status == "active", Campaign.created_by == current_user.id)
    )).scalar() or 0
    owned_prospects = Prospect.campaign_id.in_(select(Campaign.id).where(Campaign.created_by == current_user.id))
    prospects = (await db.execute(select(func.count(Prospect.id)).where(owned_prospects))).scalar() or 0
    
    messages_sent = (await db.execute(
        select(func.count(Message.id)).join(Prospect).join(Campaign).where(Message.status.in_(["sent", "delivered"]), Campaign.created_by == current_user.id)
    )).scalar() or 0

    replies = (await db.execute(
        select(func.count(Conversation.id)).join(Prospect).join(Campaign).where(Conversation.direction == "inbound", Campaign.created_by == current_user.id)
    )).scalar() or 0

    meetings = (await db.execute(
        select(func.count(Conversation.id)).join(Prospect).join(Campaign).where(Conversation.sentiment == "meeting_requested", Campaign.created_by == current_user.id)
    )).scalar() or 0

    pending_approvals = (await db.execute(
        select(func.count(Message.id)).join(Prospect).join(Campaign).where(Message.status.in_(["draft", "pending_approval"]), Campaign.created_by == current_user.id)
    )).scalar() or 0

    pending_followups = (await db.execute(
        select(func.count(FollowUp.id)).join(Prospect).join(Campaign).where(FollowUp.status == "pending", Campaign.created_by == current_user.id)
    )).scalar() or 0

    # Today's actions
    actions = []
    if pending_followups > 0:
        actions.append(f"{pending_followups} follow-ups due")
    if pending_approvals > 0:
        actions.append(f"{pending_approvals} messages awaiting approval")
    if replies > 0:
        actions.append(f"{replies} replies to review")

    return DashboardStats(
        total_companies=companies,
        total_contacts=contacts,
        total_campaigns=campaigns,
        active_campaigns=active_campaigns,
        total_prospects=prospects,
        messages_sent=messages_sent,
        replies_received=replies,
        meetings_booked=meetings,
        pending_approvals=pending_approvals,
        pending_followups=pending_followups,
        today_actions=actions,
    )
