from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.crud.base import CRUDBase
from app.models.transaction import Transaction, TransactionType
from app.schemas.transaction import TransactionCreate, TransactionUpdate


class CRUDTransaction(CRUDBase[Transaction, TransactionCreate, TransactionUpdate]):
    def get_user_transactions(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Transaction]:
        return (
            db.query(self.model)
            .filter(Transaction.user_id == user_id)
            .order_by(desc(Transaction.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create_with_user(
        self, db: Session, *, obj_in: TransactionCreate, user_id: int, balance: float
    ) -> Transaction:
        obj_in_data = obj_in.model_dump()
        db_obj = self.model(**obj_in_data, user_id=user_id, balance=balance)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_recharge_transactions(self, db: Session, *, user_id: int) -> List[Transaction]:
        return (
            db.query(self.model)
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == TransactionType.RECHARGE
            )
            .order_by(desc(Transaction.created_at))
            .all()
        )

    def get_by_stripe_payment_id(self, db: Session, payment_id: str) -> Optional[Transaction]:
        return (
            db.query(self.model)
            .filter(Transaction.stripe_payment_id == payment_id)
            .first()
        )


crud_transaction = CRUDTransaction(Transaction)
