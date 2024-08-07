#!/usr/bin/python3

"""Flask config."""
import secrets
print(secrets.token_hex(16))
print(len('scrypt:32768:8:1$hSb6Wkv4h7Dfvzi1$68f08579b8f07e15aadc4bb6a6bbd088f58f4d908ecf09013149f4c1f668415639aaf52c02fcae037676fae0ed9c5a23f1a37573e4aa285fbd5060bab31e825e'))
# import os

# basedir = os.path.abspath(os.path.dirname(__file__))

# class Config:
#     SQLALCHEMY_DATABASE_URI = 'mysql://root:password@localhost/smartcare'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback_secret_key')































# import os
# from os import environ, path
# from dotenv import load_dotenv
# # cant download the library
# basedir = path.abspath(path.dirname(__file__))
# load_dotenv(path.join(basedir, '.env'))


# class Config:
#     """Base config."""
#     SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
#     # SESSION_COOKIE_NAME = os.environ.get('SESSION_COOKIE_NAME')
#     STATIC_FOLDER = 'static'
#     TEMPLATES_FOLDER = 'templates'
#     TESTING = True
#     DEBUG = True


# class ProdConfig(Config):
#     FLASK_ENV = 'production'
#     DEBUG = False
#     TESTING = False
#     DATABASE_URI = os.environ.get('PROD_DATABASE_URI')


# class DevConfig(Config):
#     FLASK_ENV = 'development'
#     DEBUG = True
#     TESTING = True
#     DATABASE_URI = os.environ.get('DEV_DATABASE_URI')


# DEBUG: Extremely useful when developing! DEBUG mode triggers several things. Exceptions thrown by the app will print to the console automatically, app crashes will result in a helpful error screen, and your app will auto-reload when changes are detected.
# FLASK_ENV: The environment the app is running in, such as development or production. Setting the environment to development mode will automatically trigger other variables, such as setting DEBUG to True. Flask plugins similarly behave differently when this is true.
# TESTING: This mode ensures exceptions are propagated rather than handled by the app's error handlers, which is useful when running automated tests.
# SECRET_KEY: Flask "secret keys" are random strings used to encrypt sensitive user data, such as passwords. Encrypting data in Flask depends on the randomness of this string, which means decrypting the same data is as simple as getting a hold of this string's value. Guard your secret key with your life; ideally, even you shouldn't know the value of this variable.
# SERVER_NAME: If you intend your app to be reachable on a custom domain, we specify the app's domain name here.
# SQLALCHEMY_DATABASE_URI: The connection string of your app's database.
# SQLALCHEMY_ECHO: Prints database-related actions to console for debugging purposes.
# SQLALCHEMY_ENGINE_OPTIONS: Additional options to be passed to the SQLAlchemy engine, which holds your app's database connection.
# SESSION_TYPE: Session information can be handled via Redis, Memcached, filesystem, MongoDB, or SQLAlchemy.
# SESSION_PERMANENT: A True/False value, which states whether or not user sessions should last forever.
# SESSION_KEY_PREFIX: Modifies the key n
