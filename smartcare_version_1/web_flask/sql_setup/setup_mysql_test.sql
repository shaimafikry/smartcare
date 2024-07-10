-- Write a script that prepares a MySQL server for the project:
-- A database smart_care_test

CREATE DATABASE IF NOT EXISTs smart_care_test;

-- A new user hbnb_test (in localhost)
-- The password of hbnb_test should be set to hbnb_test_pwd

-- CREATE USER IF NOT EXISTS hbnb_test@localhost IDENTIFIED BY 'hbnb_test_pwd';

-- hbnb_test should have all privileges on the database hbnb_test_db (and only this database)
-- USE hbnb_test_db;
-- GRANT ALL ON hbnb_test_db.*
-- TO hbnb_test@localhost;

-- hbnb_test should have SELECT privilege on the database performance_schema (and only this database)
-- USE performance_schema;
-- GRANT SELECT
-- ON performance_schema.*
-- TO hbnb_test@localhost;

FLUSH PRIVILEGES;
