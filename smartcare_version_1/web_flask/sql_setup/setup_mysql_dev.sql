-- create a data base for our storage

CREATE DATABASE IF NOT EXISTs smart_care;

-- -- A new user hbnb_dev (in localhost)
-- -- The password of hbnb_dev should be set to hbnb_dev_pwd
-- in case we wanted to create a nother user
-- CREATE USER IF NOT EXISTS user_name@localhost IDENTIFIED BY 'password';

-- -- user_name should have all privileges on the database smart_care (and only this database)
-- USE smart_care;
-- GRANT ALL ON smart_care.*
-- TO user_name@localhost;

-- user_name should have SELECT privilege on the database performance_schema (and only this database)
-- USE performance_schema;
-- GRANT SELECT
-- ON performance_schema.*
-- TO user_name@localhost;

FLUSH PRIVILEGES;
