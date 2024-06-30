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
pt = Patient(29709151313726)
pt.name = "MOSTADA"
pt.complain = " abdominal pain"
pt.address = "egypt"
pt.save()
print(pt)

print("-- Create a 2 object --")
pt = Patient(29709151313565)
pt.name = "akram"
pt.complain = " back pain"
pt.address = "egypt"
pt.save()
print(pt)

print("-- Create a 3 object --")
model = Manager()
model.name = "hosam"
model.password = "test"
model.save()
print(model)

print("-- Create a 4 object --")
model = Doctor()
model.name = "shaimaa"
model.password = "test"
model.save()
print(model)

model = Doctor()
model.name = "hosam"
model.password = "test"
model.phone = "54688"
model.save()
print(model)

model = Nurse()
model.name = "teaa"
model.password = "test"
model.phone = "54688"
model.save()
print(model)

model = Receptionist()
model.name = "moaz"
model.password = "test"
model.phone = "54688"
model.save()
print(model)

user = storage.get('R00041')
print ("get", user)
