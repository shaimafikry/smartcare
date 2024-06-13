#!/usr/bin/python3
"""manager profile
    """

from base_model import BaseModel

class Manager(BaseModel):
    """manager profile"""
    def __init__(self):
        super().__init__('manager')
    name = ""
    phone = ""
    department = ""
    sepciality = ""
