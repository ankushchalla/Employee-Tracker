const mysql = require('mysql');
const cTable = require('console.table');

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

    getAll(view) {
        return new Promise((resolve, reject) => {
            let query = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department, manager
        FROM employee
            INNER JOIN role ON employee.role_id = role.ID
            INNER JOIN department ON role.department_id = department.ID;`;
            this.connection.query(query, (err, res) => {
                if (err) return reject(err);
                for (let i = 0; i < res.length; i++) {
                    /*
                      res[i].manager = the mysql KEY (int starting at 1) that corresponds to another employee. 
                      The position of this employee in the res array is given by res[i].manager - 1.
                    */
                    if (res[i].manager) {
                        res[i].manager = res[res[i].manager - 1].first_name + " " + res[res[i].manager - 1].last_name;
                    }
                }
                view ? console.table(res): resolve(res);
            });
        });
    }

    // Get employee/department/role table.
    viewTable(table) {
        this.connection.query(`SELECT * FROM ${table}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            return res;
        });
    }

    // View all employees in a specific department
    // You can probably just filter a table by department.
    async viewDepartment(department) {
        let employees = await this.getAll(false)
        employees = employees.filter(employee => employee.department === department);
        console.table(employees);
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

    // Change the role of an employee.
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
