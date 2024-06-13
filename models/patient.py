#!/usr/bin/python3
"""patient profile
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
    def __init__(self):
        self.name = ""
        self.adress = ""
        self.phone = ""
        self.nat_id = ""
        self.id = generate_id(self.nat_id)
        self.sex = ""
        self.age = ""
        self.history = ""
        self.treatment = ""
        self.complain = ""
        self.scans = ""
        self.labs= ""
        self.admission_date = datetime.time()
        self.discharge_date = ""
        self.update = ""
        self.vitals = ""
