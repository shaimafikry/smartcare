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
        temp = copy.deepcopy(FileStorage.__objects)
        for val in temp.values():
            for k, v in val.items():
                val[k] = v.to_dict()
        if cls == None:
            return temp
        else:            
            return temp[cls]

    def get (self, id):
        """return specific workers"""
        classes = {'M': 'Manager', 'D': 'Doctor',
                   'N': 'Nurse', 'R': 'Receptionist', 'P': 'Patient'}
        clss = classes[id[0]]
        dict_object = FileStorage.__objects[clss].get(id, None)
        if dict_object is not None:
            dict_object.to_dict()
        return dict_object

    def new (self, obj):
        """save to object dict"""
        cls_name = obj.to_dict()['__class__']
        FileStorage.__objects[cls_name].update({obj.id: obj})



    def save (self):
        """ save to a file in json"""
        with open(FileStorage.__file, 'w') as f:
            # deep copy to prevent any modification to the orginal
            # why deep copy ? coz the dict is dict of dicts
            temp = copy.deepcopy(FileStorage.__objects)
            # print (temp)
            for val in temp.values():
            # print ("fisrt vale", val)
                for k, v in val.items():
                # print("before to dict to file object", v.admission_at)
                    val[k] = v.to_dict()
            # print (temp)
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
                        FileStorage.__objects[job][id] = classes[job](**dct)
        except FileNotFoundError:
            pass

    def close(self):
        """call reload() method for deserializing the JSON file to objects"""
        self.reload()
