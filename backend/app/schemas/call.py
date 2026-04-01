from typing import Optional
from pydantic import BaseModel
from datetime import datetime

from app.models.call import CallStatus


class CallBase(BaseModel):
    phone_number: str


class CallCreate(CallBase):
    pass


class CallUpdate(BaseModel):
    status: Optional[CallStatus] = None
    duration: Optional[int] = None
    cost: Optional[float] = None
    ended_at: Optional[datetime] = None


class Call(CallBase):
    id: int
    user_id: int
    status: CallStatus
    duration: int
    cost: float
    started_at: datetime
    ended_at: Optional[datetime] = None
    twilio_call_sid: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CallRate(BaseModel):
    country: str
    country_code: str
    rate: float
    currency: str
