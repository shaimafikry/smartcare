#!/usr/bin/python3
"""receptionist profile
    """

from base_model import BaseModel

class Receptionist(BaseModel):
    """receptionist profile"""
    def __init__(self):
        super().__init__('receptionist')
    name = ""
    phone = ""
    department = ""
    sepciality = ""
