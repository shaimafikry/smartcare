#!/usr/bin/python3
"""nurse profile
    """

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import os

if os.getenv('HBNB_TYPE_STORAGE') == "db":
    class Nurse(BaseModel, Base):
        """nusre profile"""
        __tablename__ = "nurse"
        name = Column(String(60), nullable=False, primary_key=True)
        phone = Column(String(60), nullable=False)
        sepcialty = Column(String(60), nullable=False)
        department = Column(String(60), nullable=False)
else:
    class Nurse(BaseModel):
        """nusre profile"""
        def __init__(self, *args, **kwargs):
            super().__init__('nurse', *args, **kwargs)
        name = ""
        phone = ""
        department = ""
        sepcialty = ""


        
# self.name = kwargs.get("name", "")
# self.phone = kwargs.get("phone", "")
# self.department = kwargs.get("department", "")
# self.specialty = kwargs.get("specialty", "")
