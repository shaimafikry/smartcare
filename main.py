#!/usr/bin/python3

import random
import string
from models.base_model import BaseModel
from models.manager import Manager
from models.doctor import Doctor
from models.nurse import Nurse
from models.receptionist import Receptionist
from models.patient import Patient
from models import FileStorage


# Function to generate a unique nat_id for Patient objects
def generate_nat_id():
    return ''.join(random.choices(string.digits, k=14))

# Initialize FileStorage
storage = FileStorage()

all_objs = storage.all()
# print(all_objs)
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

# Create 10 Doctor objects with different attributes
for i in range(10):
    doc = Doctor(name=f"Doctor{i}", phone=f"Phone{i}", specialty=f"Specialty{i}", department=f"Department{i}", password=f"Password{i}")
    storage.new(doc)
    storage.save()

# Create 10 Nurse objects with different attributes
for i in range(10):
    nurse = Nurse(name=f"Nurse{i}", phone=f"Phone{i}", specialty=f"Specialty{i}", department=f"Department{i}", password=f"Password{i}")
    storage.new(nurse)
    storage.save()

# Create 10 Manager objects with different attributes
for i in range(10):
    manager = Manager(name=f"Manager{i}", phone=f"Phone{i}", specialty=f"Specialty{i}", department=f"Department{i}", password=f"Password{i}")
    storage.new(manager)
    storage.save()

# Create 10 Receptionist objects with different attributes
for i in range(10):
    receptionist = Receptionist(name=f"Receptionist{i}", phone=f"Phone{i}", specialty=f"Specialty{i}", department=f"Department{i}", password=f"Password{i}")
    storage.new(receptionist)
    storage.save()

# Create 10 Patient objects with different attributes and unique nat_id
for i in range(10):
    patient = Patient(nat_id=generate_nat_id(), name=f"Patient{i}", address=f"Address{i}", phone=f"Phone{i}", sex="Male", age=str(i+20), history="History{i}", treatment="Treatment{i}", complaint="Complaint{i}", diagnosis="Diagnosis{i}", scans="Scans{i}", labs="Labs{i}", heart_rate=i, temperature=(i+30)/10, rbs=i, oxygen_saturation=i, blood_pressure=f"BloodPressure{i}", respiratory_rate=i)
    storage.new(patient)
    storage.save()

# Ensure to call storage.close() at the end if needed to deserialize the JSON file to objects
