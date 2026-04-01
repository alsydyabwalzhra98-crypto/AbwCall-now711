from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app.crud import contact as crud_contact
from app.api import deps
from app.models.user import User
from app.db.session import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Contact)
def create_contact(
    *,
    db: Session = Depends(get_db),
    contact_in: schemas.ContactCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    existing = crud_contact.get_by_phone(db, user_id=current_user.id, phone=contact_in.phone)
    if existing:
        raise HTTPException(status_code=400, detail="Contact with this phone number already exists")
    contact = crud_contact.create_with_user(db=db, obj_in=contact_in, user_id=current_user.id)
    return contact


@router.get("/", response_model=List[schemas.Contact])
def get_contacts(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud_contact.get_user_contacts(db=db, user_id=current_user.id, skip=skip, limit=limit)


@router.get("/search", response_model=List[schemas.Contact])
def search_contacts(
    *,
    db: Session = Depends(get_db),
    query: str,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud_contact.search_contacts(db=db, user_id=current_user.id, query=query)


@router.get("/favorites", response_model=List[schemas.Contact])
def get_favorite_contacts(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud_contact.get_user_favorites(db=db, user_id=current_user.id)


@router.get("/{contact_id}", response_model=schemas.Contact)
def get_contact(
    *,
    db: Session = Depends(get_db),
    contact_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    contact = crud_contact.get(db=db, id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    if contact.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return contact


@router.put("/{contact_id}", response_model=schemas.Contact)
def update_contact(
    *,
    db: Session = Depends(get_db),
    contact_id: int,
    contact_in: schemas.ContactUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    contact = crud_contact.get(db=db, id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    if contact.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud_contact.update(db=db, db_obj=contact, obj_in=contact_in)


@router.delete("/{contact_id}", response_model=schemas.Contact)
def delete_contact(
    *,
    db: Session = Depends(get_db),
    contact_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    contact = crud_contact.get(db=db, id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    if contact.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud_contact.remove(db=db, id=contact_id)
