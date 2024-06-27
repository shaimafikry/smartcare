#!/usr/bin/python3
""" creating a database using sql with python"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker , scoped_session, Session
from models.base_model import  BaseModel, Base
from models.nurse import Nurse
from models.doctor import Doctor
from models.manager import Manager
from models.receptionist import Receptionist
from models.patient import Patient


# script that prints the State object with the name
# passed as argument from the database hbtn_0e_6_usa
#classes that holds vlues
classes = { 'BaseModel': BaseModel, 'Doctor': Doctor, 'Nurse': Nurse,
            'Manager': Manager, 'Receptionist': Receptionist, 'Patient':Patient
                }
class DBStorage:
    """ the new engine"""
    __engine=None
    __session=None
    def __init__(self):
        """constructor of engine"""
        user = "root"
        paswd = os.getenv('MYSQL_PWD')
        host = "localhost"
        database = os.getenv('MYSQL_DB')
        self.__engine = create_engine("mysql+mysqldb://"+user+':'+paswd+'@'+host+'/'+database, pool_pre_ping=True,)
        if os.getenv('CARE_ENV') == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """get all data on the current session"""
        # in the query i put the name not the value
        dict_ins = {}
        if cls:
            data = self.__session.query(cls).all()
            for i in data:
                key = i.id
                dict_ins[key] = i
        else:
            for clss in classes.keys():
                data = self.__session.query(clss).all()
                for i in data:
                    key = i.id
                    dict_ins[key] = i
        return dict_ins


    def new(self, obj):
        """ add the object to the current database session (self.__session) """
        cls_name = obj.__class__.__name__
        for i in self.__session.query(classes[cls_name]).all():
            if obj.id == i.id:
                obj.id = BaseModel.generate_id(cls_name)
        self.__session.add(obj)


    def save(self):
        """commit all changes of the current database session (self.__session)"""
        self.__session.commit()


    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj:
            self.__session.delete(obj)


    def reload(self):
        """import the data back"""
        Base.metadata.create_all(self.__engine)
        ses_maker = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(ses_maker)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()
