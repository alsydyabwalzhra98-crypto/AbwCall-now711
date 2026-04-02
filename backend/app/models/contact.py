from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import BaseModel


class Contact(BaseModel):
    __tablename__ = "contacts"
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String)
    is_favorite = Column(Boolean, default=False)
    avatar_url = Column(String)
    
    # Relationships
    user = relationship("User", back_populates="contacts")
