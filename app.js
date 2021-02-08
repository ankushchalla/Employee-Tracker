
const inquirer = require('inquirer');
const Employee_Tracker = require('./sql_queries');
const cTable = require('console.table');

function main() {
    let employeeTracker = new Employee_Tracker();

    let questions = [
        {
            type: 'list',
            name: 'route',
            message: 'What would you like to do?',
            choices: ['View all employees.', 'View employees by department.', 'View employees by role.', 'Add a department.',
                'Add a role.', 'Add an employee.', 'Update an employee role.', 'End program.']
        }
    ];
    inquirer.prompt(questions).then(async response => {
        let table;
        switch (response.route) {
            case 'View all employees.':
                table = await employeeTracker.getAll(false);
                console.table(table);
                main();
                break;
            case 'View employees by department.':
                let departments = await employeeTracker.getDepartments();
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Choose department:',
                        choices: departments
                    }
                ]).then(async answer => {
                    table = await employeeTracker.viewDepartment(answer.department);
                    console.table(table);
                    main();
                });
                break;
            case 'View employees by role.':
                let roles = await employeeTracker.getRoles();
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Choose role:',
                        choices: roles
                    }
                ]).then(async answer => {
                    table = await employeeTracker.viewByRole(answer.role);
                    console.table(table);
                    main();
                });
                break;
            case 'Add a department.':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Enter the name of the new department:'
                    }
                ]).then(async answer => {
                    let departments = await employeeTracker.addDepartment(answer.department);
                    console.log(departments);
                    main();
                });
                break;
            case 'Add a role.':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the name of the new role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the new role:'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Enter the department ID for the new role:'
                    }
                ]).then(async answer => {
                    let roles = await employeeTracker.addRole({
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id
                    });
                    console.log(roles);
                    main();
                });
                break;
            case 'Add an employee.':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter the first name of the new employee:'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter the last name of the new employee:'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Enter the role ID for the new employee:'
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Enter the manager ID for the new employee:'
                    }
                ]).then(async answer => {
                    let employees = await employeeTracker.addEmployee({
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        manager: answer.manager
                    });
                    console.table(employees);
                    main();
                });
                break;
            case 'End program.':
                employeeTracker.connection.end();
                process.exit(0);
        }
    });
}

main();
