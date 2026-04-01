from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.crud import transaction as crud_transaction, user as crud_user
from app.api import deps
from app.models.user import User
from app.db.session import get_db
from app.models.transaction import TransactionType, TransactionStatus

router = APIRouter()


@router.post("/create-intent")
def create_payment_intent(
    *,
    db: Session = Depends(get_db),
    amount: float,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")

    return {
        "message": "Payment processing requires Stripe configuration",
        "amount": amount,
        "currency": "usd",
    }


@router.post("/webhook")
async def stripe_webhook() -> Any:
    return {"status": "ok"}
