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

// db.query('SELECT * FROM employee', function(err, results) {
//     console.log(results);
// });

// app.use((req, res) => {
//     res.status(404).end();
//   });

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

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

function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        }
        console.table(result);
        userPrompts();
        });
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        }
        console.table(result);
        userPrompts();
        });
};

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
        db.query("INSERT INTO department (id, name) VALUES (?,?)", [response.departmentID, response.departmentName], function (err, data) {
            if (err) throw err;
            console.log('New department successfully added.');

            viewAllDepartments()
        })

    });

};

function addRole() {
    
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
            message: "What is the pay for this position?",
        },
        {
            name: "roleDept",
            type: "input",
            message: "What departmentID does the role belong to?"
        }
    ])
    .then(function (response) {
        db.query("INSERT INTO roles (id, title, salary, department_id) VALUES (?,?,?,?)", [response.roleID, response.roleTitle, response.roleSalary, response.roleDept], function (err, data) {
            if (err) throw err;
            console.log("New Role successfully added.");

            viewAllRoles()
        })
    })
};

function addEmployee() {};

function updateEmployeeRole() {};


userPrompts();