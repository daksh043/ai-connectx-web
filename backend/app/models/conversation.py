"""Conversation model — Full thread of messages with a prospect"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    prospect_id = Column(Integer, ForeignKey("prospects.id"), nullable=False, index=True)
    channel = Column(String(50), nullable=False)  # linkedin, email
    message = Column(Text, nullable=False)
    direction = Column(String(20), nullable=False)  # outbound, inbound
    sender_name = Column(String(200), nullable=True)

    # AI analysis of inbound messages
    sentiment = Column(String(50), nullable=True)  # interested, needs_info, not_interested, etc.
    suggested_action = Column(Text, nullable=True)

    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    prospect = relationship("Prospect", backref="conversations")
