CREATE DATABASE wmsu_clinic_database;

CREATE TABLE units (
    unit_id SERIAL NOT NULL,
    unit_description VARCHAR(225) NOT NULL,
    PRIMARY KEY (unit_id)
);

CREATE TABLE departments (
    department_id SERIAL NOT NULL, 
    department_description VARCHAR(225) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE courses (
    course_id SERIAL NOT NULL,
    course_description VARCHAR(225) NOT NULL,
    PRIMARY KEY (course_id),
    fk_department_id integer REFERENCES departments (department_id),
    UNIQUE(fk_department_id)
);



CREATE TABLE patients (
    patient_id SERIAL NOT NULL,
    patient_weight VARCHAR(225),
    patient_height VARCHAR(225),
    patient_bp VARCHAR(225),
    patient_sugar_level VARCHAR(225),
    patient_body_temperature VARCHAR(255),
    Date_taken Date,
    PRIMARY KEY (patient_id)
);


CREATE TABLE students (
    student_id VARCHAR(225),
    student_lastname VARCHAR(225) NOT NULL,
    student_firstname VARCHAR(225) NOT NULL,
    student_middlename VARCHAR(225) NOT NULL,
    student_extname VARCHAR(225),
    PRIMARY KEY (student_id),
    fk_course integer REFERENCES courses (course_id),
    fk_patient integer REFERENCES patients (patient_id),
    UNIQUE(fk_course),
    UNIQUE(fk_patient)  
);

CREATE TABLE employees (
    employee_id VARCHAR(225),
    employee_lastname VARCHAR(225) NOT NULL,
    employee_firstname VARCHAR(225) NOT NULL,
    employee_middlename VARCHAR(225) NOT NULL,
    employee_extname VARCHAR(225),
    employee_position VARCHAR(255) NOT NULL,
    PRIMARY KEY (employee_id),
    fk_patient integer REFERENCES patients (patient_id),
    fk_unit integer REFERENCES units (unit_id),
    UNIQUE(fk_patient),
    UNIQUE(fk_unit)
);
 
CREATE TABLE accounts (
    account_id UUID DEFAULT uuid_generate_v4(),
    account_lastname VARCHAR(225) NOT NULL,
    account_firstname VARCHAR(225) NOT NULL,
    account_middlename VARCHAR(225) NOT NULL,
    account_extname VARCHAR(225),
    account_username VARCHAR(225) NOT NULL,
    account_password VARCHAR(225) NOT NULL,
    account_type VARCHAR(225) NOT NULL,
    account_status VARCHAR(225) NOT NULL,
    account_date_created VARCHAR(225) NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE bundles (
    bundle_id SERIAL NOT NULL,
    bundle_arrived_date timestamp,
    bundle_expiration_date Date,
    bundle_total_quantity BIGINT NOT NULL,
    PRIMARY KEY (bundle_id)
);

CREATE TABLE medicines (
    medicine_id SERIAL NOT NULL,
    medicine_Generic_name VARCHAR(225) NOT NULL,
    medicine_Brand_name VARCHAR(225) NOT NULL,
    medicine_Dosage VARCHAR(225) NOT NULL,
    Quantity BIGINT NOT NULL,
    PRIMARY KEY (medicine_id),
    fk_bundle integer REFERENCES bundles(bundle_id)
);

CREATE TABLE records (
    record_id SERIAL NOT NULL,
    record_date Date,
    diagnosis VARCHAR(225) NOT NULL,
    medicine_given BIGINT,
    PRIMARY KEY (record_id),
    fk_patient integer REFERENCES patients (patient_id),
    fk_medicine integer REFERENCES medicines(medicine_id),
    fk_account UUID REFERENCES accounts(account_id)
);

