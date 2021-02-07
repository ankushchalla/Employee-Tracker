const mysql = require('mysql');

class Employee_Tracker {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',

            // Your port; if not 3306
            port: 3306,

            // Your username
            user: 'root',

            // Be sure to update with your own MySQL password!
            password: 'Ouim@te1',
            database: 'employee_tracker_db',

            multipleStatements: true
        });
    }
    // Get employee/department/role table.
    viewTable(table) {
        this.connection.query(`SELECT * FROM ${table}`, (err, res) => {
            if (err) throw err;
            console.log(res);
        });
    }

    // View all employees in a specific department
    viewDepartment(department) {
        let query = `DROP TABLE IF EXISTS employee_names;

        CREATE TEMPORARY TABLE employee_names (
            first_name VARCHAR(30) NOT NULL, 
            last_name VARCHAR(30) NOT NULL,
            role VARCHAR(30) NOT NULL,
            department_id INT NOT NULL
        );
        
        INSERT INTO employee_names
        -- Get department_id from role. --   
        SELECT first_name, last_name, role.title, department_id
        FROM employee
        INNER JOIN role ON employee.role_id = role.ID;
        
        SELECT department.name, first_name, last_name, role FROM 
        employee_names
        INNER JOIN department ON employee_names.department_id = department.ID
        WHERE department.name = ?;`

        this.connection.query(query, [department], (err, res) => {
            if (err) throw err;
            console.log(res[res.length - 1]);
        })
    }

    // View employees by role.
    viewByRole(role) {
        let query = `SELECT role.title, first_name, last_name, manager_id FROM employee 
        INNER JOIN role ON employee.role_id = role.ID
        WHERE role.title = ?;`

        this.connection.query(query, [role], (err, res) => {
            if (err) throw err;
            console.log(res);
        })
    }

    addDepartment(department) {
        this.connection.query("INSERT INTO department (name) VALUES (?)", [department], (err, res) => {
            if (err) throw err;
            this.viewTable("department")
        })
    }

    addRole(role) {
        this.connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [role.title, role.salary, role.department_id],
            (err, res) => {
                if (err) throw err;
                this.viewTable("role")
            });
    }

    addEmployee(employee) {
        this.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [employee.first_name, employee.last_name, employee.role_id, employee.manager_id],
            (err, res) => {
                if (err) throw err;
                this.viewTable("employee")
            });
    }

    updateEmployeeRole(firstName, lastName, newRole) {
        this.connection.query("SELECT role.ID FROM role WHERE role.title = ?", [newRole], (err, res) => {
            if (err) throw err;
            let newRoleID = res[0].ID;
            let query = `UPDATE employee SET role_id = ?
            WHERE first_name = ? AND last_name = ?;`;
            this.connection.query(query, [newRoleID, firstName, lastName], (err, res) => {
                if (err) throw err;
                this.viewTable("employee");
            })
        })

    }
}



module.exports = Employee_Tracker;
