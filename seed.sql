INSERT INTO department (name) VALUES ("Junior Developer"), ("Database Admin"), ("Intern"), ("Senior Developer"), ("Designer");

INSERT INTO role (title, salary, department_id) 
VALUES ("Junior Developer", 80000, 303), ("Database Admin", 80000, 301), ("Intern", 50000, 302), ("Senior Developer", 150000, 401), ("Designer", 80000, 205);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ankush", "Challa", 303, 2), ("Rafael", "Bautista", 401, NULL), ("Bryan", "Hernandez", 302, 2), ("Richard", "Taguba", 301, NULL), ("Sasri", "Dedigama", 205, 2);