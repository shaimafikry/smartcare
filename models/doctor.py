#!/usr/bin/python3
"""dctor profile
    """

from base_model import BaseModel

class Doctor(BaseModel):
    """doctor profile"""
    def __init__(self):
        super().__init__('doctor')
    name = ""
    phone = ""
    department = ""
    sepciality = ""
