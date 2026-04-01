from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
import enum

from app.db.base import BaseModel


class TransactionType(str, enum.Enum):
    RECHARGE = "recharge"
    CALL = "call"
    WITHDRAW = "withdraw"
    TRANSFER = "transfer"


class TransactionStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


class Transaction(BaseModel):
    __tablename__ = "transactions"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    balance = Column(Float, nullable=False)
    description = Column(String)
    status = Column(Enum(TransactionStatus), default=TransactionStatus.PENDING)
    payment_method = Column(String)
    stripe_payment_id = Column(String)
    completed_at = Column(DateTime(timezone=True))

    user = relationship("User", back_populates="transactions")
