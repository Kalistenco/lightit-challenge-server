CREATE DATABASE IF NOT EXISTS patientsdb;
USE patientdb; 
drop table if exists patients;
CREATE TABLE patients(id bigint unsigned not null auto_increment,
    name varchar(255) default null,
    email varchar(255) default null,
	address varchar(255) default null,
    phone varchar(30) default null,
	created_at timestamp default current_timestamp,
    primary key (id),
    constraint UQ_Patients_Email unique (email)
) auto_increment = 1