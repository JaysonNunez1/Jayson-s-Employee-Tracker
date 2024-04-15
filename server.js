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
             



             '

    ])
}