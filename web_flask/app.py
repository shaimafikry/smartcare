#!/usr/bin/python3
"""This module use flask"""
from models import storage
from models import *
from models.manager import Manager
from models.doctor import Doctor
from models.nurse import Nurse
from models.receptionist import Receptionist
from models.patient import Patient
import os
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import json
import secrets

app = Flask(__name__)
# how to get the key ?
# python -c "import secrets; print(secrets.token_hex(16))"
# export FLASK_SECRET_KEY= (key_generated)
# it ends after every seesion => when close the vs
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')

app.secret_key = secrets.token_hex(16)

classes = {'M': 'Manager', 'N': 'Nurse', 'R': 'Receptionist', 'D': 'Doctor', 'P': 'Patient'}
clas_create = {'M': Manager, 'N': Nurse, 'R': Receptionist, 'D': Doctor, 'P': Patient}

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
            user = storage.get_obj(usr_id)
            if user is not None:
                if user['password'] == psswd:
                    session['user_id'] = usr_id
                    cls_name = (classes[usr_id[0]]).lower()
                    print(usr_id)
                    if usr_id[0] == 'D' or usr_id[0] == 'N':
                        return redirect(url_for('dashboard'))
                    else:
                        return redirect(url_for(f'{cls_name}_dashboard'))
        return render_template('index.html')

def show_the_login_form():
    return render_template('index.html')

# manager
@app.route('/dashboard/manager', methods=['GET', 'POST'])
def manager_dashboard():
    # in case of edit
    user_id = session.get('user_id')
    user = storage.get_obj(user_id)
    if request.method == 'POST':
        user_type = request.form.get('userType')
        name = request.form.get('userName')
        user_password = request.form.get('userPassword')
        phone = request.form.get('userPhone')
        specialty = request.form.get('userSpecialty')
        department = request.form.get('userDepartment')

        if user_type == 'Nurses':
            new_nurse = Nurse(name=name, password=user_password, phone=phone, specialty=specialty, department=department)
            new_nurse.save()
            flash(f'User {name} (ID: {new_nurse.id}) added successfully', 'success')

        if user_type == 'Doctors':
            new_doctor = Doctor(name=name, password=user_password, phone=phone, specialty=specialty, department=department)
            new_doctor.save()

        if user_type == 'Managers':
            new_manager = Manager(name=name, password=user_password, phone=phone, specialty=specialty, department=department)
            new_manager.save()
            flash(f'User {name} (ID: {new_nurse.id}) added successfully', 'success')

        if user_type == 'Receptionists':
            new_receptionist = Receptionist(name=name, password=user_password, phone=phone, specialty=specialty, department=department)
            new_receptionist.save()
            flash(f'User {name} (ID: {new_nurse.id}) added successfully', 'success')

    nurse_data= storage.all('Nurse')
    patient_data= storage.all('Patient')
    doctor_data=  storage.all('Doctor')
    receptionist_data= storage.all('Receptionist')
    manager_data= storage.all('Manager')
    print(storage.all())
    return render_template('manager.html', name=user['name'],
                                nurse=nurse_data, doctor=doctor_data,
                                manager=manager_data, receptionist=receptionist_data,
                                patient=patient_data)

# nurse
@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    all_patients = storage.all('Patient')
    # print(all_patients)
    active_pt = {}
    for k, v in all_patients.items():
        if v.get('discharge_at') == None:
            active_pt[k] = v
    # print("=>",active_pt)
    user_id = session.get('user_id')
    cl = (classes[user_id[0]]).lower()
    return render_template('departments.html', patients=active_pt, cl=cl)

# doctor
@app.route('/dashboard/doctor/<pt_id>', methods=['GET', 'POST'])
def doctor_dashboard(pt_id):
    user_id = session.get('user_id')
    user = storage.get_obj(user_id)
    patient = storage.get_obj(pt_id)
    if request.method == 'POST':
        data = request.json
        storage.update_obj(pt_id, data)
    return render_template('doctor.html', name=user['name'], patient=patient)


@app.route('/dashboard/nurse/<pt_id>', methods=['GET', 'POST'])
def nurse_dashboard(pt_id):
    user_id = session.get('user_id')
    user = storage.get_obj(user_id)
    patient = storage.get_obj(pt_id)
    return render_template('nurse.html', name=user['name'], patient=patient)



# receptionist
@app.route('/dashboard/receptionist',methods=['POST', 'GET'])
def receptionist_dashboard():
    user_id = session.get('user_id')
    user = storage.get_obj(user_id)
    if request.method == 'POST':
        data = {
            'name':request.form.get('pt_name'),
            'nat_id':request.form.get('pt_nat_id'),
            'adress':request.form.get('pt_adress'),
            'age':request.form.get('pt_age'),
            'department':request.form.get('pt_department'),
            'sex':request.form.get('pt_sex')
        }
        new_pt = Patient(**data)
        new_pt.save()
    return render_template('receptionist.html', name=user['name'])

# profile
@app.route('/dashboard/profile', methods=['GET', 'POST'])
def profile():
    # opens profile page of the user
    # on the sign in session not in general
    user_id = session.get('user_id')
    usr = storage.get_obj(user_id)
    if request.method == 'POST':
        data = {
            'password':request.form.get('userPassword'),
        }
        storage.update_obj(user_id, data)
        usr = storage.get_obj(user_id)
        return render_template('profile.html', user=usr)
    return render_template('profile.html', user=usr)


# rout for specific user or patient
# from manager pov
@app.route('/dashboard/<cl_s>/<user_id>', methods=['GET', 'POST'])
def individual(cl_s, user_id):
    show_user = storage.get_obj(user_id)
    if request.method == 'POST':
        if request.form.get('action') == 'delete':
            print(storage.all(cl_s))
            storage.delete_obj(user_id)
            print(storage.all(cl_s))
            # Redirect or return a response indicating success
            return redirect(url_for('manager_dashboard'))
        else:
            data = {
                'name':request.form.get('userName'),
                'password':request.form.get('userPassword'),
                'phone':request.form.get('userPhone'),
                'speciality':request.form.get('userSpeciality'),
                'department':request.form.get('userDepartment')
            }
            storage.update_obj(user_id, data)
            show_user = storage.get_obj(user_id)
        
    return render_template('edit-user.html', user=show_user, cl_s=cl_s, user_id=user_id)


# # pt active no sicharge date
# @app.route('/dashboard/active/patient/<pt_id>', methods=['GET', 'POST'])
# def active_patient_profile(pt_id):
#     patient = storage.get_obj(pt_id)
#     user_id = session.get('user_id')
#     user = storage.get_obj(user_id)
#     if user_id[0] == 'D':
#         render_template('doctor.html', name=user['name'], patient=patient)
#     render_template('nurse.html')

# pt have a dischagre date
@app.route('/dashboard/saved/patient/<pt_id>', methods=['GET', 'POST'])
def saved_patient_profile(pt_id):
        patient = storage.get_obj(pt_id)
        return render_template('saved-patient.html', pt=patient)


@app.route('/sign_out')
def sign_out():
    # Clear the session
    session.clear()
    # Redirect to the login page or home page
    return redirect(url_for('login')) 

# @app.route('/forgot_password', methods=['POST'])
# def forget_password():
#     return render_template('forget password.html')


@app.teardown_appcontext
def close_db(exception=None):
    storage.close()


# api
@app.route('/api/users')
def users():
    users = storage.all()
    return users
@app.route('/api/users/manager')
def user_manager():
    users = storage.all('Manager')
    return users
@app.route('/api/users/doctor')
def user_doctor():
    users = storage.all('Doctor')
    return users
@app.route('/api/users/nurse')
def user_nurse():
    users = storage.all('Nurse')
    return users
@app.route('/api/users/receptionist')
def user_receptionist():
    users = storage.all('Receptionist')
    return users
@app.route('/api/patient')
def patients():
    users = storage.all('Patient')
    return users


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
