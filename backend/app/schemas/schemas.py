"""Pydantic schemas for all API request/response models."""
import re
import html
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime


def sanitize_input(value: Optional[str]) -> Optional[str]:
    """Sanitize strings by stripping HTML script tags, event handlers, and trimming."""
    if not value or not isinstance(value, str):
        return value
    # Remove script tags and contents
    cleaned = re.sub(r"<script.*?>.*?</script>", "", value, flags=re.IGNORECASE | re.DOTALL)
    # Remove javascript: pseudo-protocols
    cleaned = re.sub(r"javascript:\s*", "", cleaned, flags=re.IGNORECASE)
    # Remove inline event attributes (e.g. onload=, onerror=, onclick=)
    cleaned = re.sub(r"on\w+\s*=\s*([\"'][^\"']*[\"']|[^\s>]+)", "", cleaned, flags=re.IGNORECASE)
    return cleaned.strip()


# ─── Auth ────────────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None

EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(...)
    password: str = Field(..., min_length=8, max_length=128)
    role: str = Field(default="team")

    @validator("name")
    def validate_name(cls, v):
        sanitized = sanitize_input(v)
        if not sanitized or len(sanitized) < 2:
            raise ValueError("Name must be at least 2 characters long")
        return sanitized

    @validator("email")
    def validate_email(cls, v):
        cleaned = v.strip().lower()
        if not re.match(EMAIL_REGEX, cleaned):
            raise ValueError("Invalid email format")
        return cleaned

    @validator("password")
    def validate_password_strength(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter (A-Z)")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter (a-z)")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number (0-9)")
        return v

class UserLogin(BaseModel):
    email: str
    password: str

    @validator("email")
    def validate_email(cls, v):
        cleaned = v.strip().lower()
        if not re.match(EMAIL_REGEX, cleaned):
            raise ValueError("Invalid email format")
        return cleaned

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    is_active: bool
    avatar_url: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── Company ─────────────────────────────────────────────────────
class CompanyCreate(BaseModel):
    name: str = Field(..., max_length=255)
    website: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    size: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    linkedin_url: Optional[str] = None
    logo_url: Optional[str] = None
    source: Optional[str] = None

class CompanyOut(BaseModel):
    id: int
    name: str
    website: Optional[str] = None
    industry: Optional[str] = None
    location: Optional[str] = None
    size: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    linkedin_url: Optional[str] = None
    logo_url: Optional[str] = None
    research_summary: Optional[str] = None
    relevance_score: Optional[float] = None
    relevance_reasoning: Optional[str] = None
    collaboration_areas: Optional[List[str]] = None
    source: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class CompanyDiscoverRequest(BaseModel):
    industry: str
    location: Optional[str] = None
    size: Optional[str] = None
    collaboration_type: Optional[str] = None
    count: int = Field(default=10, ge=1, le=50)


# ─── Contact ─────────────────────────────────────────────────────
class ContactCreate(BaseModel):
    company_id: int
    name: str
    title: Optional[str] = None
    linkedin_url: Optional[str] = None
    business_email: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = None

class ContactOut(BaseModel):
    id: int
    company_id: int
    name: str
    title: Optional[str] = None
    linkedin_url: Optional[str] = None
    business_email: Optional[str] = None
    email_status: Optional[str] = None
    avatar_url: Optional[str] = None
    source: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── Campaign ────────────────────────────────────────────────────
class CampaignCreate(BaseModel):
    name: str = Field(..., max_length=255)
    objective: Optional[str] = None
    collaboration_type: Optional[str] = None
    target_industry: Optional[List[str]] = None
    target_company_size: Optional[str] = None
    target_location: Optional[str] = None
    target_roles: Optional[List[str]] = None
    tone: str = Field(default="professional")
    max_followups: int = Field(default=2)
    followup_interval_days: int = Field(default=5)

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    objective: Optional[str] = None
    collaboration_type: Optional[str] = None
    target_industry: Optional[List[str]] = None
    target_company_size: Optional[str] = None
    target_location: Optional[str] = None
    target_roles: Optional[List[str]] = None
    tone: Optional[str] = None
    status: Optional[str] = None
    max_followups: Optional[int] = None
    followup_interval_days: Optional[int] = None

class CampaignOut(BaseModel):
    id: int
    name: str
    objective: Optional[str] = None
    collaboration_type: Optional[str] = None
    target_industry: Optional[List[str]] = None
    target_company_size: Optional[str] = None
    target_location: Optional[str] = None
    target_roles: Optional[List[str]] = None
    tone: Optional[str] = None
    status: Optional[str] = None
    max_followups: Optional[int] = None
    followup_interval_days: Optional[int] = None
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── Prospect ────────────────────────────────────────────────────
class ProspectCreate(BaseModel):
    campaign_id: int
    company_id: int
    contact_id: Optional[int] = None
    notes: Optional[str] = None

class ProspectUpdate(BaseModel):
    status: Optional[str] = None
    contact_id: Optional[int] = None
    notes: Optional[str] = None

class ProspectOut(BaseModel):
    id: int
    campaign_id: int
    company_id: int
    contact_id: Optional[int] = None
    qualification_score: Optional[float] = None
    qualification_reasoning: Optional[str] = None
    collaboration_ideas: Optional[List[str]] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None

    # Nested relations
    company: Optional[CompanyOut] = None
    contact: Optional[ContactOut] = None

    class Config:
        orm_mode = True


# ─── Message ─────────────────────────────────────────────────────
class MessageCreate(BaseModel):
    prospect_id: int
    channel: str  # linkedin, email
    subject: Optional[str] = None
    body: str
    message_type: str = "initial"

class MessageOut(BaseModel):
    id: int
    prospect_id: int
    channel: str
    subject: Optional[str] = None
    body: str
    message_type: Optional[str] = None
    quality_check: Optional[dict] = None
    status: Optional[str] = None
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    sent_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── Conversation ────────────────────────────────────────────────
class ConversationCreate(BaseModel):
    prospect_id: int
    channel: str
    message: str
    direction: str  # outbound, inbound
    sender_name: Optional[str] = None

class ConversationOut(BaseModel):
    id: int
    prospect_id: int
    channel: str
    message: str
    direction: str
    sender_name: Optional[str] = None
    sentiment: Optional[str] = None
    suggested_action: Optional[str] = None
    timestamp: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── FollowUp ────────────────────────────────────────────────────
class FollowUpOut(BaseModel):
    id: int
    prospect_id: int
    followup_number: int
    scheduled_at: datetime
    status: str
    message_id: Optional[int] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


# ─── AI Requests ─────────────────────────────────────────────────
class AIResearchRequest(BaseModel):
    company_id: int

class AIQualifyRequest(BaseModel):
    prospect_id: int

class AICollaborationIdeasRequest(BaseModel):
    company_id: int
    collaboration_type: Optional[str] = None

class AILinkedInMessageRequest(BaseModel):
    prospect_id: int
    collaboration_idea: Optional[str] = None
    tone: str = "professional"

class AIEmailRequest(BaseModel):
    prospect_id: int
    collaboration_idea: Optional[str] = None
    tone: str = "professional"

class AIFollowUpRequest(BaseModel):
    prospect_id: int
    followup_number: int = 1

class AIReplyRequest(BaseModel):
    prospect_id: int
    inbound_message: str

class AssistantChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    context: Optional[dict] = None

class AssistantChatResponse(BaseModel):
    message: str
    suggested_actions: List[str] = []

class AutomationCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    trigger_type: str = "new_prospect"
    conditions: Optional[List[dict]] = None
    actions: Optional[List[dict]] = None
    approval_mode: str = "approval_required"
    confidence_threshold: int = Field(default=85, ge=0, le=100)
    status: str = "draft"

class AutomationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    trigger_type: Optional[str] = None
    conditions: Optional[List[dict]] = None
    actions: Optional[List[dict]] = None
    approval_mode: Optional[str] = None
    confidence_threshold: Optional[int] = Field(default=None, ge=0, le=100)
    status: Optional[str] = None

class AutomationGenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=4000)

class AutomationOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    trigger_type: str
    conditions: Optional[List[dict]] = None
    actions: Optional[List[dict]] = None
    approval_mode: str
    confidence_threshold: int
    status: str
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class AIQualityCheckResult(BaseModel):
    personalization: bool
    relevance: bool
    length: str
    generic_language: bool
    clear_cta: bool
    duplicate_wording: bool
    reasoning: str


# ─── Dashboard / Analytics ───────────────────────────────────────
class DashboardStats(BaseModel):
    total_companies: int = 0
    total_contacts: int = 0
    total_campaigns: int = 0
    active_campaigns: int = 0
    total_prospects: int = 0
    messages_sent: int = 0
    replies_received: int = 0
    meetings_booked: int = 0
    pending_approvals: int = 0
    pending_followups: int = 0
    today_actions: List[str] = []

class CampaignAnalytics(BaseModel):
    campaign_id: int
    campaign_name: str
    total_prospects: int = 0
    companies_discovered: int = 0
    contacts_discovered: int = 0
    qualified_prospects: int = 0
    linkedin_drafts: int = 0
    emails_drafted: int = 0
    messages_approved: int = 0
    messages_sent: int = 0
    replies: int = 0
    positive_responses: int = 0
    meetings: int = 0
    pipeline_breakdown: dict = {}
