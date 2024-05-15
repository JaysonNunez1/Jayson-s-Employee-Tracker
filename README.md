# Jayson-s-Employee-Tracker

## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Questions?](#questions)

## Description 
For this project i built an Employee Tracker for companies to keep track of there employees and departments.i will be using SQL, and MySQL.Users will be prompt with a series of options to choose from.Based on the option the user chooses you can add,delete,and edit employee roles.Users can also add,delete,and edit departments as well.

## Installation 
1. Clone my repo from github with this command:
```
git clone git@github.com:JaysonNunez1/Jayson-s-Employee-Tracker.git
```
2.You need to install node as a dependencies after cloning the repo with this command:
```
npm install
```
3.You will need to set up your MySql login credentials in the server.js file<br><br>
4.You then need to build the database and tables and seed the tables with this command:
```
mysql -u root -p
SOURCE db/schema.sql
SOURCE db/seeds.sql
```
5.Create a .env file to hold your MySql connection and include these lines of code:
```
DB_HOST='localhost'
DB_USER=''
DB_PASSWORD=''
DB_DBASE='employee_db'
```
6. Start the employee tracker by typing this command into your terminal:
 ```
   npm start
   ```

## Usage 
The intended use of this tracker is to help employers keep track of there company. Employers can easily add,delete,and edit different roles through out the company.Employers can also add,delete,and edit different departments as well as assign different employees to different departmments.

## Questions:
If you have any questions contact me at <br>
[JaysonNunez1](https://github.com/JaysonNunez1/Jayson-s-Employee-Tracker)<br>
jaysonnunez1@gmail.com

