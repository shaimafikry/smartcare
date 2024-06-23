#!/usr/bin/python3
"""dctor profile
    """

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import os

if os.getenv('TYPE_STORAGE') == "db":
    class Doctor(BaseModel, Base):
        """doctor profile"""
        __tablename__ = "doctor"
        name = Column(String(60), nullable=False, primary_key=True)
        phone = Column(String(60), nullable=False)
        specialty = Column(String(60), nullable=False)
        department = Column(String(60), nullable=False)
else:
    class Doctor(BaseModel):
        def __init__(self, *args, **kwargs):
            super().__init__('doctor', *args, **kwargs)
            name = ""
            phone = ""
            department = ""
            sepcialty = ""

# self.name = kwargs.get("name", "")
# self.phone = kwargs.get("phone", "")
# self.department = kwargs.get("department", "")
# self.specialty = kwargs.get("specialty", "")
