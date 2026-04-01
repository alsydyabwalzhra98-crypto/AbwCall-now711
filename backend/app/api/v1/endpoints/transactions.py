from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.crud import transaction as crud_transaction, user as crud_user
from app.api import deps
from app.models.user import User
from app.db.session import get_db

router = APIRouter()


@router.post("/recharge")
def recharge_balance(
    *,
    db: Session = Depends(get_db),
    recharge_in: schemas.RechargeRequest,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if recharge_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")

    transaction = crud_transaction.create_with_user(
        db=db,
        obj_in=schemas.TransactionCreate(
            type=schemas.TransactionType.RECHARGE,
            amount=recharge_in.amount,
            description="Account recharge",
            payment_method=recharge_in.payment_method,
            status=schemas.TransactionStatus.COMPLETED,
        ),
        user_id=current_user.id,
        balance=current_user.balance + recharge_in.amount,
    )

    crud_user.update_balance(db, user=current_user, amount=recharge_in.amount)

    return {"transaction_id": transaction.id, "new_balance": current_user.balance}


@router.post("/withdraw")
def withdraw_balance(
    *,
    db: Session = Depends(get_db),
    withdraw_in: schemas.WithdrawRequest,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if withdraw_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")
    if current_user.balance < withdraw_in.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    transaction = crud_transaction.create_with_user(
        db=db,
        obj_in=schemas.TransactionCreate(
            type=schemas.TransactionType.WITHDRAW,
            amount=withdraw_in.amount,
            description=f"Withdrawal to {withdraw_in.bank_account}",
            status=schemas.TransactionStatus.PENDING,
        ),
        user_id=current_user.id,
        balance=current_user.balance - withdraw_in.amount,
    )

    crud_user.update_balance(db, user=current_user, amount=-withdraw_in.amount)
    return {"message": "Withdrawal request submitted", "transaction_id": transaction.id}


@router.get("/", response_model=List[schemas.Transaction])
def get_transactions(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud_transaction.get_user_transactions(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
