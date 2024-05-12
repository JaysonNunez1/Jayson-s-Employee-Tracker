-- Active: 1709685388560@@127.0.0.1@3306@employee_db
USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Cashier"), ("Maintenance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Associate",70000,1),
    ("Sales Manager",100000,1),
    ("Cashier Manager", 50000, 2),
    ("Cashier", 40000, 2),
    ("Maintenance", 55000, 3),
    ("Lawyer", 185000, 4),
    ("Paralegal", 60000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("lebron", "James", 1,null),
("kobe", "bryant", 1,2),
("steph", "curry", 3,null),
("Allen", "Iverson",4,null),
("Shaquille", "O'Neal", 4,null),
("Kyrie", "Irving",3,null),
("Kevin", "Durant",1,null),
("Carmelo", "Anthony",1,2);