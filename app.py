#!/usr/bin/python3
"""This module use flask"""
from models import storage
from models import *
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
@app.route('/', strict_slashes=False, methods=['GET', 'POST'])
@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()

def do_the_login():
        # get the name and password
        name = request.form.get('username')
        psswd = request.form.get('password')
        # check if there are on db:
        role = None
        if name and psswd:
            # check name
            if name in (storage.all().values).keys:
                if name[0] == 'D' or name[0] == 'N':
                    if psswd == name['password']:
                        role = 'Departments'
                if name[0] == 'R':
                    if psswd == name['password']:
                        role = 'receptionist'
                if name[0] == 'M':
                    if psswd == name['password']:
                        role = 'manager'
        if role:
            return redirect( url_for('dashboard', role))

        return render_template('index.html')

def show_the_login_form():
    return render_template('index.html')

@app.route('/dashboard/<role>')
def dashboard(role):
    return render_template(f'{role}.html')

@app.teardown_appcontext
def close_db(exception=None):
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
