#!/usr/bin/python3
"""files storages module
    """
""" how objects ares saved
	{Nurse:{id:data, id:data}, doctor:{id:data}"""

import json, os
import copy


class FileStorage:
    """to store data into json files"""
    # all workers together
    __file = "data.json"
    __objects = {'Nurse':{}, 'Doctor':{}, 'Manager':{}, 'Receptionist': {}, 'Patient': {}}
   
    def all (self, cls=None):
        """return all workers"""
        if cls == None:
            return FileStorage.__objects
        else:            
            return FileStorage.__objects[cls]
    
    def update_obj (self,id, data):
        """update specific object with dict"""
        classes = {'M': 'Manager', 'D': 'Doctor',
                   'N': 'Nurse', 'R': 'Receptionist', 'P': 'Patient'}
        self.all(classes[id[0]])[id].update(data)
        self.save()

    def get_obj (self, id):
        """return specific workers"""
        classes = {'M': 'Manager', 'D': 'Doctor',
                   'N': 'Nurse', 'R': 'Receptionist', 'P': 'Patient'}
        clss = classes.get(id[0])
        dict_object = FileStorage.__objects[clss].get(id)
        return dict_object
    
    def delete_obj (self, id):
        """delete specific workers"""
        classes = {'M': 'Manager', 'D': 'Doctor',
                   'N': 'Nurse', 'R': 'Receptionist', 'P': 'Patient'}
        let = id[0]
        clss = classes.get(let)
        FileStorage.__objects[clss].pop(id, None)
        self.save()

    def new (self, obj):
        """save to object dict"""
        n_obj = obj.to_dict()
        cls_name = n_obj['__class__']
        FileStorage.__objects[cls_name].update({obj.id: n_obj})

    def save (self):
        """ save to a file in json"""
        with open(FileStorage.__file, 'w') as f:
            temp = copy.deepcopy(FileStorage.__objects)
            json.dump(temp, f)

        
        
        
    def reload (self):
        """ reload from file json"""
        """Loads storage dictionary from file"""
        from models.base_model import BaseModel
        from models.doctor import Doctor
        from models.nurse import Nurse
        from models.patient import Patient
        from models.manager import Manager
        from models.receptionist import Receptionist

        classes = {
                    'BaseModel': BaseModel, 'Doctor': Doctor, 'Nurse': Nurse,
                    'Manager': Manager, 'Receptionist': Receptionist, 'Patient':Patient
                }
        try:
            individuals = {}
            with open(FileStorage.__file, 'r') as f:
                # checks of the file exists and empty
                if os.path.getsize(FileStorage.__file) <= 2:
                    return
                individuals = json.load(f)
                for job, employees in individuals.items():
                    for id, dct in employees.items():
                        FileStorage.__objects[job][id] = (classes[job](**dct)).to_dict()
        except FileNotFoundError:
            pass

    def close(self):
        """call reload() method for deserializing the JSON file to objects"""
        self.reload()
