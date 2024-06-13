#!/usr/bin/python3
"""nurse profile
    """

from base_model import BaseModel

class Nurse(BaseModel):
    """nusre profile"""
    def __init__(self):
        super().__init__('nurse')
    name = ""
    phone = ""
    department = ""
    sepciality = ""
