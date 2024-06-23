#!/usr/bin/python3
from models import storage
from models.patient import Patient
from models.doctor import Doctor
all_objs = storage.all()
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

print("-- Create a 1 object --")
my_model = Patient(29709151313726)
my_model.name = "My_First_Model"
my_model.my_number = 89
my_model.save()
print(my_model)
print("-- Create a 2 object --")
my_model = Patient(29709151313726)
my_model.name = "gbcvb"
my_model.my_number = 89
my_model.save()
print(my_model)

print("-- Create a 2 object --")
my_model = Patient(29709151313565)
my_model.name = "My_First_Model"
my_model.my_number = 89
my_model.save()
print(my_model)
