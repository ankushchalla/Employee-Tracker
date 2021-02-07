INSERT INTO department (name) VALUES ("Management"), ("Marketing"), ("Developement");

INSERT INTO role (title, salary, department_id) 
VALUES ("Junior Developer", 80000, 303), ("Database Admin", 80000, 301), ("Intern", 50000, 302), ("Senior Developer", 150000, 401), ("Designer", 80000, 205);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ankush", "Challa", 303, 2), ("Rafael", "Bautista", 401, NULL), ("Bryan", "Hernandez", 302, 2), ("Richard", "Taguba", 301, NULL), ("Sasri", "Dedigama", 205, 2);

DROP TABLE IF EXISTS employee_names;

CREATE TEMPORARY TABLE employee_names (
	first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    department_id INT NOT NULL
);

INSERT INTO employee_names
SELECT first_name, last_name, department_id
FROM employee
INNER JOIN role ON employee.role_id = role.ID;

SELECT * FROM 
employee_names
INNER JOIN department ON employee_names.department_id = department.ID
WHERE department.name = "Developement";