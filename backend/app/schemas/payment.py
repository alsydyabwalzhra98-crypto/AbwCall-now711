from typing import Optional
from pydantic import BaseModel


class PaymentIntentCreate(BaseModel):
    amount: float
    payment_method_id: Optional[str] = None


class PaymentIntentResponse(BaseModel):
    client_secret: str
    payment_intent_id: str
    amount: float
    currency: str = "usd"
