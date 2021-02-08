DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;
CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO department (department)
VALUES ("Management"), ("Marketing"), ("Developement");

INSERT INTO role (title, salary, department_id) 
VALUES ("Junior Developer", 80000, 3), ("Database Admin", 80000, 1), ("Intern", 50000, 3), ("Senior Developer", 150000, 1), ("Marketing Lead", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUE ("Ankush", "Challa", 1, 2), ("Rafael", "Bautista", 4, NULL), ("Bryan", "Hernandez", 3, 2), ("Richard", "Taguba", 1, NULL), ("Sasri", "Dedigama", 5, NULL);
