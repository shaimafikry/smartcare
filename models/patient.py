#!/usr/bin/python3
"""main module for base class
    """
import random
import string
from datetime import datetime

def generate_id(number):
    random.seed(number)
    letter = random.choice(string.ascii_uppercase)
    digits = ''.join(random.choices(string.digits, k=9))
    unique_id = letter + digits
    return unique_id

class Patient:
""" patient profile"""
def __init__(self,*args,*kwargs):
self.name = ""
self.adress = ""
self.phone = ""
self.nat_id = ""
self.id = generate_id(slef.nat_id)
self.sex = ""
self.age = ""
self.history = ""
self.treatment = ""
self.complain = ""
self.scans = ""
self.labs= ""
self.admission_date = date.time(now)
self.discharge_date = ""
self.update = ""
self.vitals = ""