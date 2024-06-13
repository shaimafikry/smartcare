#!/usr/bin/python3
"""main module for base class
    """

from base_model import BaseModel
from doctor import Doctor
from nurse import Nurse
from manager import Manager
from receptionist import Receptionist

user = BaseModel()
user_doctor = Doctor()
user_nurse = Nurse()
user_res = Receptionist()
user_manager = Manager()

print(user.id)
print(user_doctor.id)
print(user_nurse.id)
print(user_res.id)
print(user_manager.id)
