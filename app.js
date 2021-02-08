
const inquirer = require('inquirer');
const Employee_Tracker = require('./sql_queries');
// const cTable = require('console.table');

function main() {
    let employeeTracker = new Employee_Tracker();
    employeeTracker.viewDepartment("Developement");
}

main();