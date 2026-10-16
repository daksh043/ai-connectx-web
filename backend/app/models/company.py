"""Company model — Discovered companies with AI research summaries"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Float, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    website = Column(String(500), nullable=True)
    industry = Column(String(100), nullable=True)
    location = Column(String(255), nullable=True)
    size = Column(String(50), nullable=True)  # e.g. "51-200"
    description = Column(Text, nullable=True)
    technologies = Column(JSON, nullable=True)  # ["Python", "AI", "Cloud"]
    linkedin_url = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    recent_activity = Column(Text, nullable=True)

    # AI-generated research
    research_summary = Column(Text, nullable=True)
    relevance_score = Column(Float, nullable=True)
    relevance_reasoning = Column(Text, nullable=True)
    collaboration_areas = Column(JSON, nullable=True)  # ["Workshop", "Guest Lecture"]

    source = Column(String(100), nullable=True)  # how the company was discovered
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
