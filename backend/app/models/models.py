"""
Database models for Tokenholic application
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import String, Text, Integer, Float, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.core.database import Base


class DifficultyLevel(str, enum.Enum):
    """Role play difficulty levels"""
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class ScenarioType(str, enum.Enum):
    """Role play scenario types"""
    DISCOVERY = "discovery"
    TECHNICAL = "technical"
    OBJECTION = "objection"
    EXECUTIVE = "executive"


class Customer(Base):
    """Customer model"""
    __tablename__ = "customers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    industry: Mapped[Optional[str]] = mapped_column(String(100))
    website: Mapped[Optional[str]] = mapped_column(String(500))
    description: Mapped[Optional[str]] = mapped_column(Text)
    metadata: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    token_maps: Mapped[list["TokenMap"]] = relationship(back_populates="customer", cascade="all, delete-orphan")
    solutions: Mapped[list["Solution"]] = relationship(back_populates="customer", cascade="all, delete-orphan")


class TokenMap(Base):
    """Token Map model - stores AI/LLM usage analysis for customers"""
    __tablename__ = "token_maps"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    customer_id: Mapped[str] = mapped_column(String(36), ForeignKey("customers.id"), nullable=False)
    customer_name: Mapped[str] = mapped_column(String(255), nullable=False)
    layers: Mapped[dict] = mapped_column(JSON, default=list)  # Business layers with use cases
    providers: Mapped[dict] = mapped_column(JSON, default=list)  # Provider distribution
    total_tokens: Mapped[int] = mapped_column(Integer, default=0)
    confidence_score: Mapped[float] = mapped_column(Float, default=0.0)
    research_data: Mapped[Optional[dict]] = mapped_column(JSON)  # Raw research data
    version: Mapped[int] = mapped_column(Integer, default=1)
    notes: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer: Mapped["Customer"] = relationship(back_populates="token_maps")


class Solution(Base):
    """Solution recommendation model"""
    __tablename__ = "solutions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    customer_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("customers.id"))
    requirements: Mapped[str] = mapped_column(Text, nullable=False)
    recommendation: Mapped[str] = mapped_column(Text, nullable=False)
    products: Mapped[dict] = mapped_column(JSON, default=list)  # Recommended products
    sources: Mapped[dict] = mapped_column(JSON, default=list)  # Knowledge base sources
    version: Mapped[int] = mapped_column(Integer, default=1)
    version_history: Mapped[dict] = mapped_column(JSON, default=list)  # Previous versions
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer: Mapped[Optional["Customer"]] = relationship(back_populates="solutions")


class RolePlaySession(Base):
    """Role play session model"""
    __tablename__ = "role_play_sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    scenario: Mapped[str] = mapped_column(Enum(ScenarioType), nullable=False)
    difficulty: Mapped[str] = mapped_column(Enum(DifficultyLevel), default=DifficultyLevel.MEDIUM)
    context: Mapped[Optional[str]] = mapped_column(Text)  # Customer context for the scenario
    messages: Mapped[dict] = mapped_column(JSON, default=list)  # Conversation history
    scores: Mapped[dict] = mapped_column(JSON, default=list)  # Per-message scores
    final_score: Mapped[float] = mapped_column(Float, default=0.0)
    feedback: Mapped[Optional[str]] = mapped_column(Text)  # Final feedback
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    ended_at: Mapped[Optional[datetime]] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
