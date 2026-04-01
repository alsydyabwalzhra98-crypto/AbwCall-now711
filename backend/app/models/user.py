from sqlalchemy import Boolean, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    balance = Column(Float, default=0.0)
    avatar_url = Column(String)
    last_login = Column(DateTime(timezone=True))

    calls = relationship("Call", back_populates="user")
    contacts = relationship("Contact", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
