#!/usr/bin/python3

import os
from flask import Flask, render_template, request, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import and_
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/smartcare'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'fallback_secret_key')

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    doctors = relationship('Doctor', backref='user', cascade='all, delete-orphan')
    nurses = relationship('Nurse', backref='user', cascade='all, delete-orphan')
    managers = relationship('Manager', backref='user', cascade='all, delete-orphan')

    def __init__(self, username=None, password=None, role=None):
        self.username = username
        self.password = generate_password_hash(password)
        self.role = role
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}> : <{self.role}>'

class Manager(db.Model):
    __tablename__ = "managers"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, username=None, user_id=0):
        self.username = username
        self.user_id = user_id

    def __repr__(self):
        return f'<User {User.username}> : <{self.role}>'

class Doctor(db.Model):
    __tablename__ = "doctors"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    patients = relationship('Patient', backref='doctor', cascade='all, delete-orphan')

    def __init__(self, department=None, user_id=0):
        self.department = department
        self.user_id = user_id


    def __repr__(self):
        return f'<Doctor {self.department}>'

class Nurse(db.Model):
    __tablename__ = "nurses"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    patients = relationship('Patient', backref='nurse', cascade='all, delete-orphan')

    def __init__(self, department=None, user_id=0):
        self.department = department
        self.user_id = user_id


    def __repr__(self):
        return f'<Nurse {self.department}>'

class Patient(db.Model):
    __tablename__ = "patients"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(150), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id', ondelete='CASCADE'), nullable=False)
    nurse_id = db.Column(db.Integer, db.ForeignKey('nurses.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, name=None, department=None, bio=None, doctor_id=0, nurse_id=0):
        self.name = name
        self.department = department
        self.bio = bio
        self.doctor_id = doctor_id
        self.nurse_id = nurse_id

    def __repr__(self):
        return f'<Patient {self.name}> : <{self.department}> : <{self.bio}>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role     = request.form.get('role')
        #current_user = User(username=username, password=password, role=role)
        # db.session.add(current_user)
        # db.session.commit()
        # return str(current_user)
        current_user = User.query.filter(and_(User.username == username, User.role == role)).first()
        if current_user and current_user.check_password(password):
            login_user(current_user)
            return redirect(url_for('manager', id=current_user.id))
        else:
            return "there is some error in data"
            # flash('Login Unsuccessful. Please check username and password and role', 'danger')
    return render_template('index.html')



@app.route('/manager/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def manager(id=0):
    return render_template('manager.html')

@app.route('/doctor/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def doctor(id=0):
    return render_template('doctor.html')

@app.route('/nurse/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def nurse(id=0):
    return render_template('nurse.html')

@app.route('/receptionist/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def receptionist(id=0):
    return render_template('receptionist.html')



@app.route('/logout', strict_slashes=False)
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))



if __name__ == '__main__':
    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()  # Create the database tables
    app.run(host='0.0.0.0', port=5000, debug=True)
    