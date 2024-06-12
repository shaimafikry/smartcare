"""main module for base class
    """

from models.base_model import BaseModel

class Manager(BaseModel):
    """manager profile"""
    name = ""
    phone = ""
    department = ""
    sepciality = ""
