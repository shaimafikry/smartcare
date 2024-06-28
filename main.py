#!/usr/bin/python3
from models import storage
from models.patient import Patient
from models.doctor import Doctor
from models.manager import Manager
from models.nurse import Nurse
from models.receptionist import Receptionist
all_objs = storage.all()
# print(all_objs)
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

print("-- Create a 1 object --")
my_model = Patient(29709151313726)
my_model.name = "My_First_Model"
my_model.save()
print(my_model)

print("-- Create a 2 object --")
my_model = Patient(29709151313565)
my_model.name = "My_First_Model"
my_model.my_number = 89
my_model.save()
print(my_model)

print("-- Create a 3 object --")
my_model = Manager()
my_model.name = "My_First_Model"
my_model.password = "test"
my_model.save()
print(my_model)
print("-- Create a 4 object --")
my_model = Manager()
my_model.name = "My_First_Model"
my_model.password = "test"
my_model.save()
print(my_model)
my_model = Doctor()
my_model.name = "My_First_Model"
my_model.password = "test"
my_model.save()
print(my_model)
my_model = Nurse()
my_model.name = "My_First_Model"
my_model.password = "test"
my_model.save()
print(my_model)
my_model = Receptionist()
my_model.name = "My_First_Model"
my_model.password = "test"
my_model.save()
print(my_model)
