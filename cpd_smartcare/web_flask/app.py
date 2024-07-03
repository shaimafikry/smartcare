#!/usr/bin/python3

import os
from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
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
    receptionists = relationship('Receptionist', backref='user', cascade='all, delete-orphan')

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
    department = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(60), nullable=False)
    specialty = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    doctors = relationship('Doctor', backref='manager', cascade='all, delete-orphan')
    nurses = relationship('Nurse', backref='manager', cascade='all, delete-orphan')

    def __init__(self, department="", phone="", specialty="", user_id=0):
        self.department = department
        self.phone = phone
        self.specialty = specialty
        self.user_id = user_id

    def __repr__(self):
        return f'<Manager {self.department}>'

class Receptionist(db.Model):
    __tablename__ = "receptionists"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(60), nullable=False)
    specialty = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, department="", phone="", specialty="", user_id=0):
        self.department = department
        self.phone = phone
        self.specialty = specialty
        self.user_id = user_id

    def __repr__(self):
        return f'<Receptionist {self.department}>'

class Doctor(db.Model):
    __tablename__ = "doctors"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(60), nullable=False)
    specialty = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id', ondelete='CASCADE'), nullable=False)
    patients = relationship('Patient', backref='doctor', cascade='all, delete-orphan')

    def __init__(self, department="", phone="", specialty="", user_id=0, manager_id=0):
        self.department = department
        self.phone = phone
        self.specialty = specialty
        self.user_id = user_id
        self.manager_id = manager_id

    def __repr__(self):
        return f'<Doctor {self.department}>'

class Nurse(db.Model):
    __tablename__ = "nurses"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(60), nullable=False)
    specialty = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id', ondelete='CASCADE'), nullable=False)
    patients = relationship('Patient', backref='nurse', cascade='all, delete-orphan')

    def __init__(self, department="", phone="", specialty="", user_id=0, manager_id=0):
        self.department = department
        self.phone = phone
        self.specialty = specialty
        self.user_id = user_id
        self.manager_id = manager_id

    def __repr__(self):
        return f'<Nurse {self.department}>'

class Patient(db.Model):
    __tablename__ = "patients"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    room = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String(150), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id', ondelete='CASCADE'), nullable=False)
    nurse_id = db.Column(db.Integer, db.ForeignKey('nurses.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, name="", department="", bio="", room=0, doctor_id=0, nurse_id=0):
        self.name = name
        self.department = department
        self.bio = bio
        self.room = room
        self.doctor_id = doctor_id
        self.nurse_id = nurse_id

    def __repr__(self):
        return f'<Patient {self.name}>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@app.route('/login', strict_slashes=False, methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role')
        # current_user = User(username=username, password=password, role=role)
        # db.session.add(current_user)
        # db.session.commit()
        current_user = User.query.filter(and_(User.username == username, User.role == role)).first()
        if current_user and current_user.check_password(password):
            login_user(current_user)
            return redirect(url_for(role, id=current_user.id))
        else:
            return 'Login Unsuccessful. Please check username, password, and role'
    return render_template('index.html')

@app.route('/manager/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def manager(id):

    error_massage=""
    success_massage=""

    if request.method == 'POST':
        role = request.form.get("role")
        username = request.form.get("username")
        password = request.form.get("password")

        if not User.query.filter(User.username == username).first():
            current_user = User(username=username, password=password, role=role)
            db.session.add(current_user)
            db.session.commit()
        else:
            return "<h1> username already exists, enter a unique one </h1>"
        department = request.form.get("department")
        specialty  = request.form.get("specialty")
        phone = request.form.get("phone")

        
        if role == 'manager':
            new_manager = Manager(department=department, specialty=specialty, phone=phone, user_id=current_user.id)
            db.session.add(new_manager)
        elif role == 'doctor':
            new_doctor = Doctor(department=department, specialty=specialty, phone=phone, user_id=current_user.id, manager_id=id)
            db.session.add(new_doctor)
        elif role == 'nurse':
            new_nurse = Nurse(department=department, specialty=specialty, phone=phone, user_id=current_user.id, manager_id=id)
            db.session.add(new_nurse)
        elif role == 'receptionist':
            new_receptionist = Receptionist(department=department, specialty=specialty, phone=phone, user_id=current_user.id)
            db.session.add(new_receptionist)
        else:
            error_massage="error: Invalid role"
        
        db.session.commit()
        success_massage="user added successfully"

    nurses = User.query.filter_by(role="nurse").all()
    doctors = User.query.filter_by(role="doctor").all()
    managers = User.query.filter_by(role="manager").all()
    receptionists = User.query.filter_by(role="receptionist").all()
    host_manager = User.query.get_or_404(id)


    return render_template(
        "cpd_manager.html", id=id, name=host_manager.username,
          nurses=nurses, doctors=doctors, receptionists=receptionists, managers=managers,
          success_massage=success_massage, error_massage=error_massage)

@app.route('/doctor/<int:id>', strict_slashes=False)
@login_required
def doctor(id):
    doctor = User.query.get_or_404(id)
    return render_template("doctor.html", doctor=doctor)

@app.route('/nurse/<int:id>', strict_slashes=False)
@login_required
def nurse(id):
    nurse = User.query.get_or_404(id)
    return render_template("nurse.html", nurse=nurse)

@app.route('/receptionist/<int:id>', strict_slashes=False)
@login_required
def receptionist(id):
    receptionist = User.query.get_or_404(id)
    return render_template("receptionist.html", receptionist=receptionist)

if __name__ == "__main__":
    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()  # Create the database tables
    app.run(debug=True)
