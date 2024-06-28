#!/usr/bin/python3
"""This module use flask"""
from models import storage
from models import *
import os
from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
# app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')

@app.route('/', strict_slashes=False, methods=['GET', 'POST'])
@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()

def do_the_login():
        # get the name and password
        user_id = request.form.get('username')
        psswd = request.form.get('password')
        if user_id and psswd:
            if user_id in storage.all('Manager').keys():
                user = storage.all('Manager').get(user_id)
                user = user.to_dict()
                if user['password'] == psswd:
                    # session['user_id'] = user_id
                    return redirect(url_for('manager_dashboard'))
        return render_template('index.html')

def show_the_login_form():
    return render_template('index.html')

@app.route('/dashboard/manager')
def manager_dashboard():
    # user_id = session.get('user_id')
    # user = storage.all('Manager')[user_id]
    # user = user.to_dict()
    # nurse list = storage.all
    return render_template('manager.html')

@app.route('/dashboard/<user>')
def profile(user):
    return render_template('prfoile.html')

@app.route('/logout')
def logout():
    return render_template('index.html')

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
