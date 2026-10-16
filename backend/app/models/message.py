"""Message model — LinkedIn + Email drafts with approval workflow"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    prospect_id = Column(Integer, ForeignKey("prospects.id"), nullable=False, index=True)
    channel = Column(String(50), nullable=False)  # linkedin, email
    subject = Column(String(500), nullable=True)  # email subject
    body = Column(Text, nullable=False)
    message_type = Column(String(50), default="initial")  # initial, followup, reply

    # Quality check results
    quality_check = Column(JSON, nullable=True)
    # {"personalization": true, "relevance": true, "length": "appropriate", ...}

    # Approval workflow
    status = Column(String(50), default="draft")
    # draft → pending_approval → approved → sent → delivered → failed
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sent_at = Column(DateTime(timezone=True), nullable=True)

    prospect = relationship("Prospect", backref="messages")
    approver = relationship("User", backref="approved_messages")
