#!/usr/bin/python3
"""receptionist profile
    """

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import os

if os.getenv('TYPE_STORAGE') == "db":
    class Receptionist(BaseModel, Base):
        __tablename__ = "receptionist"
        name = Column(String(60), nullable=False, primary_key=True)
        phone = Column(String(60), nullable=False)
        sepcialty = Column(String(60), nullable=False)
        department = Column(String(60), nullable=False)

else:
    class Receptionist(BaseModel):
        """receptionist profile"""
        def __init__(self, *args, **kwargs):
            super().__init__('receptionist', *args, **kwargs)
        name = ""
        phone = ""
        department = ""
        sepcialty = ""


# self.name = kwargs.get("name", "")
# self.phone = kwargs.get("phone", "")
# self.department = kwargs.get("department", "")
# self.specialty = kwargs.get("specialty", "")
