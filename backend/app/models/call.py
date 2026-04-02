from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from app.db.base import BaseModel


class CallStatus(str, enum.Enum):
    ONGOING = "ongoing"
    COMPLETED = "completed"
    MISSED = "missed"
    FAILED = "failed"


class Call(BaseModel):
    __tablename__ = "calls"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    phone_number = Column(String, nullable=False)
    status = Column(Enum(CallStatus), default=CallStatus.ONGOING)
    duration = Column(Integer, default=0)  # in seconds
    cost = Column(Float, default=0.0)
    started_at = Column(DateTime(timezone=True), nullable=False)
    ended_at = Column(DateTime(timezone=True))
    twilio_call_sid = Column(String, unique=True)
    
    # Relationships
    user = relationship("User", back_populates="calls")
