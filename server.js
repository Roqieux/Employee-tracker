const express = require('express');

const mysql = require('mysql2');

const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sixty7Chevelle',
        database: 'hr_main_db'
    },
    console.log(`Connected to the client DB.`)
);

//inquirer prompts below. 
function userPrompts() {

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'mainmenu',
                choices: [
                    'View all departments', 'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ]
            },
        ])

        .then((data) => {
            switch (data.mainmenu) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
            }
        });

}

// View all departments
function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        userPrompts();
    });
};
//View all roles 
function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        userPrompts();
    });
};
//View all employees
function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        userPrompts();
    });
};
//Add a department 
function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentID",
            type: "input",
            message: "what is the ID for the new department?"
        },
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of your new department?"
        }

    ])
        .then(function (response) {
            db.query(`INSERT INTO department (id, name) VALUES (?,?)`, [response.departmentID, response.departmentName], function (err, data) {
                if (err) throw err;
                console.log('New department successfully added.');

                viewAllDepartments()

            })

        });

};
//Add a role
function addRole() {

    //function to display information for user to remind of already existing departments.
    viewAllDepartments()

    inquirer.prompt([
        {
            name: "roleID",
            type: "input",
            message: "What is the ID for the new role?"
        },
        {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the new role?"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the pay for this position?"
        },
        {
            name: "roleDept",
            type: "input",
            message: "What departmentID does the role belong to?"
        }
    ])
        .then(function (response) {
            db.query(`INSERT INTO roles (id, title, salary, department_id) VALUES (?,?,?,?)`, [response.roleID, response.roleTitle, response.roleSalary, response.roleDept], function (err, data) {
                if (err) throw err;
                console.log("New role successfully added.");

                viewAllRoles()
            })
        })
};
//Add an employee 
function addEmployee() {

    //functions to display information for user to remind of already existing employees and roles.
    viewAllEmployees()
    viewAllRoles()

    inquirer.prompt([
        {
            name: "empId",
            type: "input",
            messeage: "What is the new employeed ID?"
        },
        {
            name: "empFName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "empLName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "emplRoleID",
            type: "input",
            message: "what is the employee's role ID?"
        },
        {
            name: "empManager",
            type: "input",
            message: "Which managerID does this employee report to?"
        }
    ])
        .then(function (response) {
            db.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)`, [response.empID, response.empFName, response.empLName, response.empRoleID, response.empManager], function (err, data) {
                if (err) throw err;
                console.log("New employee successfully added.")

                viewAllEmployees()
            })
        })

};
//update an employee role.
function updateEmployeeRole() {
    //function to display current employees for user reference. 
    viewAllEmployees()

    inquirer.prompt([
        {
            name: "empSelect",
            type: "input",
            message: "Please provide the employeeID of the employee you would like to update."
        },
        {
            name: "empRoleUpdate",
            type: "input",
            message: "Please provide the new role ID for this employee."
        }
    ])
        .then(function (response) {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.empRoleUpdate, response.empSelect], function (err, data) {
                if (err) throw err;
                console.log('The new role entered has been added successfully to the database.');

                viewAllEmployees()
            });
        });
};




userPrompts();