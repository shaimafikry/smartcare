#!/usr/bin/python3
"""This module use flask"""
from models import storage
from models import *
from models.manager import Manager
from models.doctor import Doctor
from models.nurse import Nurse
from models.receptionist import Receptionist
import os
from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
# how to get the key ?
# python -c "import secrets; print(secrets.token_hex(16))"
# export FLASK_SECRET_KEY= (key_generated)
# it ends after every seesion => when close the vs
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')

classes = {'M': 'Manager', 'N': 'Nurse', 'R': 'Receptionist', 'D': 'Doctor'}
@app.route('/', strict_slashes=False, methods=['GET', 'POST'])
@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()

def do_the_login():
        # get the name and password
        usr_id = request.form.get('username')
        psswd = request.form.get('password')
        if usr_id and psswd:
            cls_name = classes[usr_id[0]]
            if usr_id in storage.all(cls_name).keys():
                user = storage.all(cls_name).get(usr_id)
                user = user.to_dict()
                if user['password'] == psswd:
                    session['user_id'] = usr_id
                    return redirect(url_for(f'{cls_name.lower()}_dashboard'))
        return render_template('index.html')

def show_the_login_form():
    return render_template('index.html')

# manager
@app.route('/dashboard/manager')
def manager_dashboard():
    # in case of edit
    # if request.method('POST'):
    #     pass
    user_id = session.get('user_id')
    user = storage.all('Manager')[user_id]
    user = user.to_dict()
    nurse_data= {key: nurse.to_dict() for key, nurse in storage.all('Nurse').items()}
    patient_data= {key: nurse.to_dict() for key, nurse in storage.all('Patient').items()}
    doctor_data= {key: nurse.to_dict() for key, nurse in storage.all('Doctor').items()}
    receptionist_data= {key: nurse.to_dict() for key, nurse in storage.all('Receptionist').items()}
    manager_data= {key: nurse.to_dict() for key, nurse in storage.all('Manager').items()}
    return render_template('manager.html', name=user['name'],
                           nurse=nurse_data, doctor=doctor_data,
                           manager=manager_data, receptionist=receptionist_data,
                           patient=patient_data)

# nurse
@app.route('/dashboard/nurse')
def nurse_dashboard():
    user_id = session.get('user_id')
    user = storage.all('Nurse')[user_id]
    user = user.to_dict()
    return render_template('nurse.html', name=user['name'])

 # doctor
@app.route('/dashboard/doctor')
def doctor_dashboard():
    user_id = session.get('user_id')
    user = storage.all('Doctor')[user_id]
    user = user.to_dict()
    return render_template('doctor.html', name=user['name'])
# receptionist
@app.route('/dashboard/receptionist')
def receptionist_dashboard():
    user_id = session.get('user_id')
    user = storage.all('Receptionist')[user_id]
    user = user.to_dict()
    return render_template('receptionist.html', name=user['name'])

# profile
@app.route('/dashboard/profile')
def profile():
    # opens profile page
    user_id = session.get('user_id')
    cls_name = classes[user_id[0]]
    user = storage.all(cls_name)[user_id]
    user = user.to_dict()
    return render_template('profile.html', user=user )

@app.route('/sign_out')
def sign_out():
    # Clear the session
    session.clear()
    # Redirect to the login page or home page
    return redirect(url_for('login')) 

@app.route('/test')
def test():
    return render_template('specific-user.html')

@app.teardown_appcontext
def close_db(exception=None):
    storage.close()


# api
@app.route('/api/users')
def users():
    users = storage.all()
    for i in users.values():
        for k, v in i.items():
            i[k] = v.to_dict()
    return users
@app.route('/api/users/manager')
def user_manager():
    users = storage.all('Manager')
    for k, v in users.items():
        users[k] = v.to_dict()
    return users
@app.route('/api/users/doctor')
def user_doctor():
    users = storage.all('Doctor')
    for k, v in users.items():
        users[k] = v.to_dict()
    return users
@app.route('/api/users/nurse')
def user_nurse():
    users = storage.all('Nurse')
    for k, v in users.items():
        users[k] = v.to_dict()
    return users
@app.route('/api/users/receptionist')
def user_receptionist():
    users = storage.all('Receptionist')
    for k, v in users.items():
        users[k] = v.to_dict()
    return users
@app.route('/api/patient')
def patient():
    users = storage.all('Patient')
    for k, v in users.items():
        users[k] = v.to_dict()
    return users

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
