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
}