from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime


class ContactBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    is_favorite: bool = False


class ContactCreate(ContactBase):
    pass


class ContactUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    is_favorite: Optional[bool] = None
    avatar_url: Optional[str] = None


class Contact(ContactBase):
    id: int
    user_id: int
    avatar_url: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
