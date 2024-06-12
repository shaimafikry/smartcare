"""main module for base class
    """

from models.base_model import BaseModel

class Receptionist(BaseModel):
    """receptionist profile"""
    name = ""
    phone = ""
    department = ""
    sepciality = ""
