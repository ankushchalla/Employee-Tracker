# Employee-Tracker

# Description
Employee-Tracker is command line Node.js application that uses and a MySQL database to track the employees of a user's company. The user can view employees by department and role, add employees, and update the role of an existing employee.

# Installation
After installing the above folders, make sure to have the following npm packages installed (see `package.json`):
* `inquirer`
* `console.table`
* `mysql`

After opening the MySQL Workbench, at minimum copy line 1-26 of `seed.sql` into your script and run. If you want to start with a non-empty database, feel free to copy the remaining lines of `seed.sql` into your script and run.

# Usage
In the terminal, run `npm app.js`. You will then be able to interact with the command line application to store information about your employees.

# IMPORTANT
Be sure to add the appropriate password for your MySQL connection on line 16 in `sql_queries.js`.

# Screenshot
The below screenshot demonstrates application functionality.
![Screenshot 1](https://github.com/ankushchalla/Employee-Tracker/blob/main/screenshot.png)