#!/usr/bin/python3
"""main module for base class
    """

import string
import random
from datetime import datetime

class BaseModel():
    """ main class to generate id"""
    def __init__(self):
        id_length = 5
        self.id = ''.join(random.choices(string.digits, k=id_length))
        switch type:
            case doctor:
                self.id = 'P' + id
            case manager:
               self.id = 'M' + id
            case resptionist:
                self.id = 'R' + id
            default:
            # nusres is the deafult
                self.id = 'N' + id
        start_date = date.time(today)
