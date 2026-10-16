"""Prospect model — A company+contact within a campaign pipeline"""
from sqlalchemy import Column, Integer, String, DateTime, Float, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"), nullable=False, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"), nullable=True, index=True)

    # AI qualification
    qualification_score = Column(Float, nullable=True)
    qualification_reasoning = Column(Text, nullable=True)
    collaboration_ideas = Column(JSON, nullable=True)

    # Pipeline status
    status = Column(String(50), default="discovered")
    # discovered → researched → qualified → contacted → follow_up → replied → discussion → collaboration → completed

    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    campaign = relationship("Campaign", backref="prospects")
    company = relationship("Company", backref="prospects")
    contact = relationship("Contact", backref="prospects")
