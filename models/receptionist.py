#!/usr/bin/python3
"""receptionist profile
    """

from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import os

if os.getenv('TYPE_STORAGE') == "db":
    class Receptionist(BaseModel, Base):
        __tablename__ = "receptionist"
        name = Column(String(60), nullable=False)
        phone = Column(String(60), nullable=False)
        specialty = Column(String(60), nullable=False)
        department = Column(String(60), nullable=False)
        password = Column(String(60), nullable=False)
        def __init__(self, *args, **kwargs):
            # Dynamically obtain the class name and pass it to the BaseModel constructor
            class_type = type(self).__name__
            super().__init__(class_type=class_type, *args, **kwargs)


else:
    class Receptionist(BaseModel):
        """receptionist profile"""
        def __init__(self, *args, **kwargs):
            class_type = type(self).__name__
            super().__init__(class_type=class_type, *args, **kwargs)
        name = ""
        phone = ""
        department = ""
        specialty = ""
        password = ""


# self.name = kwargs.get("name", "")
# self.phone = kwargs.get("phone", "")
# self.department = kwargs.get("department", "")
# self.specialty = kwargs.get("specialty", "")
