const mysql = require('mysql2');
const inquirer = require('inquirer');
const {exit} = require('process');
require('console.table');
require('dotenv').config();

const connection = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBASE
});

connection.connect(function (err){
    if (err) throw err;
    startTracker();
});

function startTracker(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'UserChoice',
            message:'What would you like to do?',
            choices: [
             'View all Departments',
             'View all Roles',
             'View all Employees',
             'Add a Department',
             'Add a Role',
             'Add an Employee',
             'Update an Employee Role',
             'Delete an Employee',
             'Delete a Role',
             'Delete a Department',
             'Exit'
            ]
        }

    ]).then((res) => {
        switch (res.UserChoice) {
            case 'View all Departments':
                viewAllDepartments();
                break;
            case 'View all Roles':
                viewAllRoles();
                break;

            case 'View all Employees':
                viewAllEmployees();
                break;
                
            case 'Add a Department':
                 addDepartment();
                break;

            case 'Add a Role':
                addRole();
                 break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee Role':
                updateEmployeeRole();
                break;

            case 'View Employees by Department':               
                viewEmployeesByDepartment();
                break;

            case 'Delete an Employee':
                deleteEmployee();
                break;

            case 'Delete a Role':
                 deleteRole();
                break;

            case 'Delete a Department':
                deleteDepartment();
                break;

            case 'Exit':
                connection.end();
                break;

            default:
                console.log('Error');
                connection.end();
                break;
        }
    }).catch((err) => {
        if(err)throw err;
    });
};


function viewAllDepartments(){
    let query = 'SELECT * FROM department';
    connection.query(query, function(err,res) {
        if(err) throw err;
        console.table(res);
        startTracker();
    });
};

function viewAllRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function(err,res) {
        if(err) throw err;
        console.table(res);
        startTracker();
    });
};

function viewAllEmployees() {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager '
        'FROM employee '
        'LEFT JOIN role ON employee.role_id = role.id '
        'LEFT JOIN department ON department_id = role.department_id '
        'LEFT JOIN employee manager ON manager.id = employee.manager_id';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'Name',
            message:'Department name:'
        }
        ]).then((res)=>{
            let query = 'INSERT INTO department SET ?'
            connection.query(query, {name: res.Name},(err,res) => {
                if(err) throw err;
                console.log('Department added!');
                startTracker();
        });
    });
};