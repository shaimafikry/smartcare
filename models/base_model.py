#!/usr/bin/python3
"""main module for base class
    """

import os
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.event import listen
from sqlalchemy.exc import IntegrityError

Base = declarative_base()

class BaseModel():
    """ main class to generate id"""
    __id = 0
    def generate_id (class_type):
        BaseModel.__id += 1
        id = BaseModel.__id
        # zero fills to generate id with leading zeros
        id = str(id).zfill(5)
        if class_type == 'Doctor':
            id = 'D' + id
        if class_type == 'Manager':
            id = 'M' + id
        if class_type == 'Receptionist':
            id = 'R' + id
        if class_type == 'Nurse':
            id = 'N' + id
        return id
    
    if os.getenv('TYPE_STORAGE') == "db":
        id = Column(String(60), nullable=False, primary_key=True)
        join_at = Column(DateTime, nullable=False, default=datetime.utcnow())
        edit_at = Column(DateTime, nullable=False, default=datetime.utcnow())


    def __init__(self, class_type=None, *args, **kwargs):
        # print(f"class_type: {class_type}")  # Debugging output
        if not kwargs:
            self.id = BaseModel.generate_id(class_type)
            # date of join
            # self.join_at = datetime.now()
            # date of edit
            # self.edit_at = datetime.now()
            from models import storage
            storage.new(self)
        else:
            self.id = kwargs.get('id', BaseModel.generate_id(class_type))
            # self.join_at =kwargs.get('join_at', datetime.now())
            # if type( kwargs['join_at']) == str:
            #     kwargs['join_at'] = datetime.fromisoformat(kwargs.get('join_at'))
            # self.edit_at =kwargs.get ('edit_at',  datetime.now())
            # if type( kwargs['join_at']) == str:
            #     kwargs['edit_at'] = datetime.fromisoformat(kwargs.get('edit_at'))
            if kwargs.get('__class__') != None:
                del kwargs['__class__']
            self.__dict__.update(kwargs)


    def save (self):
        """save to file_storage.__workers"""
        from models import storage
        # self.edit_at = datetime.now()
        storage.new(self)
        storage.save()


    def __str__(self):
        """Returns a string representation of the instance"""
        # <class 'models.doctor.Doctor'> => Doctor
        # cls = (str(type(self)).split('.')[-1]).split('\'')[0]
        return '[{}] ({}) {}'.format(self.__class__.__name__, self.id, self.__dict__)

    def to_dict(self):
        """Convert instance into dict format and adding keys to it"""
        new_dict = self.__dict__.copy()
        new_dict['__class__'] = self.__class__.__name__
        # if type( new_dict['join_at']) != str:
        #     new_dict['join_at'] = self.join_at.isoformat()
        # if type( new_dict['edit_at']) != str:
        #     new_dict['edit_at'] = self.edit_at.isoformat()
        return new_dict

    def delete(self):
        """delete the current instance from the storage"""
        from models import storage
        storage.delete(self)
