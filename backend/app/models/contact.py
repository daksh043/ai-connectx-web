"""Contact model — Decision-makers at companies"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    title = Column(String(200), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    business_email = Column(String(255), nullable=True)
    email_status = Column(String(50), default="unverified")  # unverified, verified, bounced
    phone = Column(String(50), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    source = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    company = relationship("Company", backref="contacts")
