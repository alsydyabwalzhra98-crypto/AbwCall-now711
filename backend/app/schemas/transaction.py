from typing import Optional
from pydantic import BaseModel
from datetime import datetime

from app.models.transaction import TransactionType, TransactionStatus


class TransactionBase(BaseModel):
    type: TransactionType
    amount: float
    description: Optional[str] = None
    payment_method: Optional[str] = None


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    description: Optional[str] = None
    status: Optional[TransactionStatus] = None
    stripe_payment_id: Optional[str] = None
    completed_at: Optional[datetime] = None


class Transaction(TransactionBase):
    id: int
    user_id: int
    balance: float
    status: TransactionStatus
    stripe_payment_id: Optional[str] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class RechargeRequest(BaseModel):
    amount: float
    payment_method: str = "stripe"


class WithdrawRequest(BaseModel):
    amount: float
    bank_account: str
