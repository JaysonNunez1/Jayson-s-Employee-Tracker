const mysql = require('mysql2');
const inquirer = require('inquirer');
const {exit} = require('process');
const { type } = require('os');
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

function addRole() {
    let query = 'SELECT * FROM department';
    let queryShow=`SELECT
    role.id,
    role.title,
    role.salary,
    role.department_id,
    department.name AS 'department_name'
    FROM role
    INNER JOIN department
    ON role.department_id = department.id`;
    connection.query(queryShow,(err,res) =>{
        if(err)throw err;
        console.table(res);
    });
    connection.query(querySelect,(err,res) =>{
        if(err)throw err;
        const department=res.map(({id,name})=>({
            value:id,
            name:`${id} ${name}`
        }));
        addRoleUser(department);
    });
 };

 function addRoleUser(department) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message:'Title:'
        },
        {
            type: 'input',
            name: 'salary',
            message:'Salary:'
        },
        {
            type: 'list',
            name: 'department',
            message:'Department:',
            choices:department
        },
    ]).then((res) => {
        let query = 'INSERT INTO role SET ?'
        connection.query(query,{
            title:res.title,
            salary:res.salary,
            department_id:res.department
        },(err,res) =>{
            if(err)throw err;
            console.log('Role added');
            startTracker();
        });
    })
 }

 function addEmployee() {
    let query = `SELECT
        role.id,
        role.title,
        role.salary 
        FROM role`;
    connection.query(query,(err,res) =>{
        if(err)throw err;
        const role=res.map(({id,title})=>({
            value:id,
            name:`${id} ${title}`
        }));
        console.table(res);
        employeeRoles(role);
    });
 };

 function employeeRoles(role) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message:'Employee First Name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message:'Employee Last Name:'
        },
        {
            type: 'list',
            name: 'roleId',
            message:'Employee Role:',
            choices:role
        }
        ]).then((res) =>{
            let query = `INSERT INTO employee SET ?`;
            connection.query(query,{
                first_name:res.first_name,
                last_name:res.last_name,
                role_id:res.roleId
            },(err,res) =>{
                if(err)throw err;
               console.log('Employee Added');
                startTracker();
            });
        });
 };

 function updateEmployeeRole() {
    let query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name,
    role.salary,
    CONCAT(manager.first_name,' ',manager.last_name) AS manager
    From employee 
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = role.department_id
    JOIN employee manager
    ON manager.id = employee.manager_id`;
    connection.query(query,(err,res) =>{
        if(err)throw err;
        const employee = res.map(({ id, first_name, last_name}) =>({
        value:id,
        name: `${first_name} ${last_name}`
        }));
        console.table(res);
        updateRole(employee);
    });
};

function updateRole(employee) {
    let query = `SELECT role.id, role.title FROM role`;
    connection.query(query,(err,res) =>{
        if(err)throw err;
        let roleChoices = res.map(({ id, title}) => ({
            value:id,
            name:`${id} ${title}`
        }));
        console.table(res);
        getUpdatedRole(employee,roleChoices);
    });
};

function getUpdatedRole(employee,roleChoices) {
    inquirer.prompt([
        {
            type:'list',
            name:'employee',
            message:"employee who's role is being changed:",
            choices:employee
        },
        {
            type:'list',
            name:'role',
            message:"new role:",
            choices:roleChoices
        }
    ]).then((res)=>{
        let query = `UPDATE employee SET role_id = ? WHERE id = ?`;
        connection.query(query,[res.role,res.employee],(err,res) =>{
            if(err)throw err;
            console.log("role updated");
            startTracker();
        });
    });
};

function viewEmployeesByDepartment() {
    let=query = `SELECT department.id, department.name FROM department`;
    connection.query(query,(err,res) =>{
        if(err)throw err;
        const departmentChoices = res.map((data)=>({
            value:data.id,
            name:data.name
            }));
            console.table(res);
            getDepartment(departmentChoices);
    });
};

function getDepartment(departmentChoices) {
    inquirer.prompt([
        {
            type:'list',
            name:'department',
            message:"department:",
            choices:departmentChoices
        }
    ]).then((res)=>{
        let query = `SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager,first_name,'',manager.last.name) As manger
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department_id = role.department_id
        LEFT JOIN employee manager ON manager_id = employee.manager_id
        WHERE department.id = ?`;
        connection.query(query,res.department,(err,res) =>{
            if(err)throw err;
            console.table(res);
            startTracker();
        });
    });
};

function viewBudgetByDepartment() {
    let query = 
    `SELECT
        department.id,
        department.name
        FROM department`;
        connection.query(query,(err,res)=>{
            if (err) throw err;
            const deptbudgetChoices = res.map((data)=>({
                value:data.id,
                name:data.name
            }));
            console.table(res);
            getBudget(deptbudgetChoices);
        });
    };

function getBudgetDept(deptbudgetChoices){
    inquirer
      .prompt([
          {
              type: 'list',
              name: 'department',
              message: 'Which Department?: ',
              choices: deptBudgetChoices
          }
      ]).then((res) => { 
      let query = `SELECT 
                      department.name AS department,
                      sum(role.salary) AS utilized_budget
                  FROM (role INNER JOIN department ON role.department_id = department.id) INNER JOIN employee ON role.id = employee.role_id
                  WHERE department.id = ?
                  GROUP BY department.name`  
      connection.query(query, res.department,(err, res) => {
      if (err) throw err;
        console.table(res);
        startTracker();
      });
  });
};

function removeEmployee() {
    let query =
    `SELECT 
        employee.id,
        employee.first_name,
        employee.last_name
        FROM employee`
        connection.query(query,(err,res)=>{
                        if (err) throw err;
                        const employee = res.map(({id,first_name,last_name})=>({
                            value:id,
                            name:`${id} ${first_name} ${last_name}`
                            }));
                            console.table(res);
                            getEmployee(employee);
                        });
                    };