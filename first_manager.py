#!/usr/bin/python3

import random
import string
from models.base_model import BaseModel
from models.manager import Manager
from models.doctor import Doctor
from models.nurse import Nurse
from models.receptionist import Receptionist
from models.patient import Patient
from models import storage


manager = Manager(name="saraa", phone="01061674178", specialty="IT", department="manager department", password="12345")
storage.new(manager)
storage.save()

print(manager)
