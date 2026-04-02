from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.crud.base import CRUDBase
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate


class CRUDContact(CRUDBase[Contact, ContactCreate, ContactUpdate]):
    def get_user_contacts(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Contact]:
        return (
            db.query(self.model)
            .filter(Contact.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_user_favorites(
        self, db: Session, *, user_id: int
    ) -> List[Contact]:
        return (
            db.query(self.model)
            .filter(Contact.user_id == user_id, Contact.is_favorite == True)
            .all()
        )

    def search_contacts(
        self, db: Session, *, user_id: int, query: str
    ) -> List[Contact]:
        return (
            db.query(self.model)
            .filter(
                Contact.user_id == user_id,
                or_(
                    Contact.name.ilike(f"%{query}%"),
                    Contact.phone.ilike(f"%{query}%"),
                    Contact.email.ilike(f"%{query}%")
                )
            )
            .all()
        )

    def create_with_user(
        self, db: Session, *, obj_in: ContactCreate, user_id: int
    ) -> Contact:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data, user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_phone(self, db: Session, *, user_id: int, phone: str) -> Optional[Contact]:
        return (
            db.query(self.model)
            .filter(Contact.user_id == user_id, Contact.phone == phone)
            .first()
        )


crud_contact = CRUDContact(Contact)
