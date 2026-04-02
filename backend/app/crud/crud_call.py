from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.crud.base import CRUDBase
from app.models.call import Call, CallStatus
from app.schemas.call import CallCreate, CallUpdate


class CRUDCall(CRUDBase[Call, CallCreate, CallUpdate]):
    def get_user_calls(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Call]:
        return (
            db.query(self.model)
            .filter(Call.user_id == user_id)
            .order_by(desc(Call.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_active_call(self, db: Session, *, user_id: int) -> Optional[Call]:
        return (
            db.query(Call)
            .filter(Call.user_id == user_id, Call.status == CallStatus.ONGOING)
            .first()
        )

    def create_with_user(
        self, db: Session, *, obj_in: CallCreate, user_id: int
    ) -> Call:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


crud_call = CRUDCall(Call)
