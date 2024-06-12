"""main module for base class
    """

from models.base_model import BaseModel

class Nurse(BaseModel):
    """nusre profile"""
    name = ""
    phone = ""
    department = ""
    sepciality = ""
