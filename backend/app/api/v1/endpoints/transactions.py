from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.models.user import User
from app.services.payment_service import PaymentService

router = APIRouter()
payment_service = PaymentService()


@router.post("/recharge")
def recharge_balance(
    *,
    db: Session = Depends(deps.get_db),
    recharge_in: schemas.RechargeRequest,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Recharge account balance
    """
    if recharge_in.amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Amount must be greater than 0"
        )
    
    # Create Stripe payment intent
    try:
        payment_intent = payment_service.create_payment_intent(
            amount=recharge_in.amount,
            user_id=current_user.id
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create payment: {str(e)}"
        )
    
    # Create pending transaction
    transaction = crud.transaction.create_with_user(
        db=db,
        obj_in=schemas.TransactionCreate(
            type=schemas.TransactionType.RECHARGE,
            amount=recharge_in.amount,
            description="Account recharge",
            payment_method=recharge_in.payment_method,
            stripe_payment_id=payment_intent.id
        ),
        user_id=current_user.id,
        balance=current_user.balance
    )
    
    return {
        "transaction_id": transaction.id,
        "client_secret": payment_intent.client_secret
    }


@router.post("/withdraw")
def withdraw_balance(
    *,
    db: Session = Depends(deps.get_db),
    withdraw_in: schemas.WithdrawRequest,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Withdraw from account balance
    """
    if withdraw_in.amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="Amount must be greater than 0"
        )
    
    if current_user.balance < withdraw_in.amount:
        raise HTTPException(
            status_code=400,
            detail="Insufficient balance"
        )
    
    # Create withdrawal transaction
    transaction = crud.transaction.create_with_user(
        db=db,
        obj_in=schemas.TransactionCreate(
            type=schemas.TransactionType.WITHDRAW,
            amount=withdraw_in.amount,
            description=f"Withdrawal to {withdraw_in.bank_account}",
            status=schemas.TransactionStatus.PENDING
        ),
        user_id=current_user.id,
        balance=current_user.balance
    )
    
    # Update user balance
    crud.user.update_balance(db, user=current_user, amount=-withdraw_in.amount)
    
    return {"message": "Withdrawal request submitted", "transaction_id": transaction.id}


@router.get("/", response_model=List[schemas.Transaction])
def get_transactions(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get user's transaction history
    """
    transactions = crud.transaction.get_user_transactions(
        db=db, user_id=current_user.id, skip=skip, limit=limit
    )
    return transactions


@router.get("/recharges", response_model=List[schemas.Transaction])
def get_recharge_history(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get user's recharge history
    """
    transactions = crud.transaction.get_recharge_transactions(
        db=db, user_id=current_user.id
    )
    return transactions


@router.post("/webhook")
def stripe_webhook(
    *,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Handle Stripe webhooks
    """
    try:
        event = payment_service.construct_webhook_event()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Webhook signature verification failed: {str(e)}"
        )
    
    # Handle the event
    if event.type == "payment_intent.succeeded":
        payment_intent = event.data.object
        # Update transaction status
        transaction = crud.transaction.get_by_stripe_payment_id(
            db, payment_intent.id
        )
        if transaction:
            transaction.status = schemas.TransactionStatus.COMPLETED
            transaction.completed_at = payment_intent.created
            db.commit()
            
            # Update user balance
            user = crud.user.get(db, id=transaction.user_id)
            if user:
                crud.user.update_balance(db, user=user, amount=transaction.amount)
    
    return {"status": "success"}
