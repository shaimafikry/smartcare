create database if not exists smartcare;
python3 -m venv venv
source venv/bin/activate
pip install flask_login

db.drop_all()
db.create_all()
