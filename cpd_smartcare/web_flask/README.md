create database if not exists smartcare;
python3 -m venv venv
source venv/bin/activate
pip install flask_login
da49bb04b5dddb800428ef31828684ea
export SECRET_KEY=da49bb04b5dddb800428ef31828684ea

db.drop_all()
db.create_all()
