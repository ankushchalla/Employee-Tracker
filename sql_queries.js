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
            password: '',
            database: 'employee_tracker_db',

            multipleStatements: true
        });
    }

    // Gets a table with all employee info: Name, role, salary, department, manager.
    getAll() {
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
                return resolve(res);
            });
        });
    }

    // View all employees in a specific department.
    async viewDepartment(department) {
        let employees = await this.getAll();
        employees = employees.filter(employee => employee.department === department);
        console.table(employees);
    }

    // View all employees who have a given role.
    async viewByRole(role) {
        let employees = await this.getAll();
        employees = employees.filter(employee => employee.title === role);
        console.table(employees);
    }

    getEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM employee', (err, res) => {
                if (err) return reject(err);
                resolve(res.map(col => col.first_name + " " + col.last_name));
            })
        })
    }

    getDepartments() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM department', (err, res) => {
                if (err) return reject(err);
                resolve(res.map(col => col.department));
            })
        })
    }

    getRoles() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM role', (err, res) => {
                if (err) return reject(err);
                resolve(res.map(col => col.title));
            })
        })
    }

    addDepartment(department) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO department (department) VALUES (?)", [department], async (err, res) => {
                if (err) reject(err);
                let departments = await this.getDepartments();
                resolve(`All departments: ${departments}`);
            });
        });
    }

    addRole(role) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [role.title, role.salary, role.department_id],
            async (err, res) => {
                if (err) reject(err);
                let roles = await this.getRoles();
                resolve(`All roles: ${roles}`);
            });
        })
        
    }

    async addEmployee(employee) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)",
            [employee.first_name, employee.last_name, employee.role_id, employee.manager],
            (err, res) => {
                if (err) reject(err);
                let employees = this.getAll();
                resolve(employees);
            });
        });
    }

    // Change the role of an employee.
    updateEmployeeRole(firstName, lastName, newRole) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT role.ID FROM role WHERE role.title = ?", [newRole], (err, res) => {
                if (err) reject(err);
                let newRoleID = res[0].ID;
                let query = `UPDATE employee SET role_id = ?
                WHERE first_name = ? AND last_name = ?;`;
                this.connection.query(query, [newRoleID, firstName, lastName], (err, res) => {
                    if (err) throw err;
                    this.getAll();
                });
            });
        });

    }
}


module.exports = Employee_Tracker;
