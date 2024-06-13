#!/usr/bin/python3
"""main module for base class
    """

import string
import random
from datetime import datetime

class BaseModel():
    """ main class to generate id"""
    __id = (10000)
    def __init__(self, class_type=None, id=None):
        if id is not None:
            id = BaseModel.__id
        else:
            BaseModel.__id += 1
            id = BaseModel.__id
        id = str(id)
        if class_type == 'doctor':
                self.id = 'D' + id
        elif class_type == 'manager':
               self.id = 'M' + id
        elif class_type == 'receptionist':
                self.id = 'R' + id
        elif class_type == 'nurse':
                self.id = 'N' + id
        else:
            self.id = 'V' + id
