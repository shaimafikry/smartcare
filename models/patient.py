#!/usr/bin/python3
"""patient profile
    """
import random
import string
from datetime import datetime
import os
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from models.base_model import Base

def generate_id(number):
    unique_id = str(number)[7:]
    return unique_id



if os.getenv('TYPE_STORAGE') == "db":
    class Patient(Base):
        __tablename__ = "patient"
        id = Column(String(60), nullable=False, primary_key=True)
        nat_id = Column(Integer, nullable=False, primary_key=True)
        admission_at = Column(DateTime, nullable=False, default=datetime.utcnow())
        updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())
        discharged_at = Column(DateTime, nullable=False, default=datetime.utcnow())
        name = Column(String(128), nullable=False)
        adress = Column(String(128), nullable=True)
        phone =  Column(String(128), nullable=True)
        sex =  Column(String(128), nullable=False)
        age =   Column(String(128), nullable=True)
        history = Column(String(128), nullable=True)
        treatment = Column(String(128), nullable=True)
        complain =  Column(String(128), nullable=True)
        scans = Column(String(128), nullable=True)
        labs= Column(String(128), nullable=True)
        heart_rate =  Column(Integer, nullable=True)
        # temprature
        temp = Column(Float, nullable=True)
        # random blood sugar
        rbs = Column(Integer, nullable=True)
        # oxygen saturation
        oxygen_sat = Column(Integer, nullable=True)
        # blood pressure
        blood_pressure = Column(String(128), nullable=True)
        #respiratory rate
        res_rate = Column(Integer, nullable=True)
else:
    class Patient:
        """ patient profile"""
        def __init__(self, *args, **kwargs):
            if not kwargs:
                self.nat_id = args[0]
                self.id = generate_id(self.nat_id)
                self.admission_at = datetime.now()
                self.updated_at = datetime.now()
            else:
                self.id = kwargs['id']
                self.nat_id = kwargs['nat_id']
                # if kwargs.get('admission_date') is not None:
                kwargs['admission_at'] = datetime.strptime(kwargs['admission_at'],
                                                        '%Y-%m-%dT%H:%M:%S.%f')
                # else:
                #     self.admission_at = datetime.now()
                #should "edit at" ony be mdoified after reload?
                # if kwargs.get('updated_at') is not None:
                kwargs['updated_at'] = datetime.strptime(kwargs['updated_at'], '%Y-%m-%dT%H:%M:%S.%f')
                # else:
                #     kwargs['updated_at'] = datetime.now()
            if kwargs.get('__class__') != None:
                del kwargs['__class__']
            self.__dict__.update(kwargs)
            name = ""
            adress =  ""
            phone = ""
            sex = ""
            age =  ""
            history = ""
            treatment = ""
            complain =  ""
            scans = []
            labs= []
            heart_rate =  0
            # temprature
            temp = 0.0
            # random blood sugar
            rbs = 0
            # oxygen saturation
            oxygen_sat = 0
            # blood pressure
            blood_pressure = ""
            #respiratory rate
            res_rate = 0
            discharge_at = datetime.now()

        def save (self):
            """save to file_storage.__workers"""
            from models import storage
            storage.new(self)
            storage.save()

        def __str__(self):
            """Returns a string representation of the instance"""
            # <class 'models.doctor.Doctor'> => Doctor
            cls = (str(type(self)).split('.')[-1]).split('\'')[0]
            return '[{}] ({}) {}'.format(cls, self.id, self.__dict__)

        def to_dict(self):
            """Convert instance into dict format and adding keys to it"""
            dictionary = {}
            dictionary.update(self.__dict__)
            dictionary.update({'__class__':
                            (str(type(self)).split('.')[-1]).split('\'')[0]})
            print(type(dictionary['admission_at']))
            dictionary['admission_at'] = self.admission_at.isoformat()
            dictionary['updated_at'] = self.updated_at.isoformat()
            # if dictionary['discharg_at'] != None:
            #     dictionary['discharge_at'] = self.discharge_at.isoformat()
            return dictionary

        def delete(self):
            """delete the current instance from the storage"""
            from models import storage
            storage.delete(self)
