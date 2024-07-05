#!/usr/bin/python3

import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import and_
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

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
    name = db.Column(db.String(50), nullable=False)
    sex = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    national_id = db.Column(db.String(50), unique=True, nullable=False)
    address = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    room = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(28), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    history = db.Column(db.String(256), nullable=True, default="was in good health")
    treatment = db.Column(db.String(256), nullable=True, default="no previous treatment")
    complain = db.Column(db.String(256), nullable=True, default="no previous complain")
    diagnosis = db.Column(db.String(256), nullable=True, default="no previous diagnosis")
    heart_rate = db.Column(db.Integer, nullable=True, default=80)
    temp = db.Column(db.Float, nullable=True, default=37)
    rbs = db.Column(db.Integer, nullable=True, default=125)  # random blood sugar
    oxygen_sat = db.Column(db.Integer, nullable=True, default=95)
    blood_pressure = db.Column(db.String(128), nullable=True, default="120/80")
    res_rate = db.Column(db.Integer, nullable=True, default=16)  # respiratory rate
    discharge_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    discharge_notes = db.Column(db.String(128), nullable=True, default="in a good health now")

    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id', ondelete='CASCADE'), nullable=False)
    nurse_id = db.Column(db.Integer, db.ForeignKey('nurses.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, name, sex, age, national_id, address, department, room, doctor_id=1, nurse_id=1,
                phone=None, updated_at=None, history=None, treatment=None, complain=None, diagnosis=None,
                heart_rate=None, temp=None, rbs=None, oxygen_sat=None, blood_pressure=None, res_rate=None,
                discharge_at=None, discharge_notes=None):
        self.name = name
        self.sex = sex
        self.age = age
        self.national_id = national_id
        self.address = address
        self.department = department
        self.room = room
        self.doctor_id = doctor_id
        self.nurse_id = nurse_id
        self.phone = phone
        self.updated_at = updated_at or datetime.utcnow()
        self.history = history or "was in good health"
        self.treatment = treatment or "no previous treatment"
        self.complain = complain or "no previous complain"
        self.diagnosis = diagnosis or "no previous diagnosis"
        self.heart_rate = heart_rate or 80
        self.temp = temp or 37
        self.rbs = rbs or 125
        self.oxygen_sat = oxygen_sat or 95
        self.blood_pressure = blood_pressure or "120/80"
        self.res_rate = res_rate or 16
        self.discharge_at = discharge_at or datetime.utcnow()
        self.discharge_notes = discharge_notes or "in a good health now"
        self.created_at = datetime.utcnow()

    def __repr__(self):
        return f'<Patient {self.name}>'

class Emergency(db.Model):
    __tablename__ = "emergencies"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id', ondelete='CASCADE'), nullable=False)
    # Define the relationship to Patient with uselist=False>>> define 1 to 1 relationship, each record here match 1 record there.
    patient = db.relationship('Patient', backref=db.backref('emergency', uselist=False, cascade='all, delete-orphan'))


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
            if role == 'manager' or role == 'receptionist':
                return redirect(url_for(role, id=current_user.id))
            else:
                return redirect(url_for('departments', id=current_user.id))
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

@app.route('/doctor/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def doctor(id):
    doctor = User.query.get_or_404(id)
    return render_template("doctor.html", name=doctor.username)

@app.route('/nurse/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def nurse(id):
    nurse = User.query.get_or_404(id)
    return render_template("nurse.html", nurse=nurse)

@app.route('/departments/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def departments(id):
    emergences = Emergency.query.all()
    nurse_or_doctor = User.query.get_or_404(id)
    return render_template("departments.html", id=id, name=nurse_or_doctor.username, emergences=emergences)

@app.route('/receptionist/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
@login_required
def receptionist(id):
    massage=""
    if request.method == 'POST':
        name = request.form.get('name')
        sex = request.form.get('sex')
        age = request.form.get('age')
        national_id = request.form.get('national_id')
        address = request.form.get('address')
        department = request.form.get('department')
        room = request.form.get('room')
        phone = request.form.get("phone")
        new_patient = Patient(
            name=name,
            sex=sex,
            age=int(age),
            national_id=national_id,
            address=address,
            department=department,
            room=int(room),
            phone=phone
        )

        db.session.add(new_patient)
        db.session.commit()
        massage="Patient added successfully"






    receptionist = User.query.get_or_404(id)
    return render_template("receptionist.html", id=id, name=receptionist.username, massage=massage)

if __name__ == "__main__":
    # with app.app_context():
    #     db.drop_all()
    #     db.create_all()  # Create the database tables
    app.run(debug=True)
