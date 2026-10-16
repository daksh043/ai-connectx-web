"""Campaign model — Collaboration outreach campaigns"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    objective = Column(Text, nullable=True)
    collaboration_type = Column(String(100), nullable=True)  # Workshop, Guest Lecture, etc.
    target_industry = Column(JSON, nullable=True)  # ["AI", "SaaS"]
    target_company_size = Column(String(50), nullable=True)
    target_location = Column(String(255), nullable=True)
    target_roles = Column(JSON, nullable=True)  # ["Founder", "HR"]
    tone = Column(String(50), default="professional")  # professional, friendly, etc.
    status = Column(String(50), default="active")  # active, paused, completed, draft
    max_followups = Column(Integer, default=2)
    followup_interval_days = Column(Integer, default=5)

    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    creator = relationship("User", backref="campaigns")
