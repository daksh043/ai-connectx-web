"""Saved AI-assisted outreach automations."""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Automation(Base):
    __tablename__ = "automations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    trigger_type = Column(String(100), nullable=False, default="new_prospect")
    conditions = Column(JSON, nullable=True)
    actions = Column(JSON, nullable=True)
    approval_mode = Column(String(50), nullable=False, default="approval_required")
    confidence_threshold = Column(Integer, nullable=False, default=85)
    status = Column(String(50), nullable=False, default="draft")
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())