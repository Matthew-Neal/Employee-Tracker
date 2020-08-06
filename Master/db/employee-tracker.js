const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "departmentRoleOrEmployee",
            type: "list",
            message: "Would you like to create [DEPARTMENT], [ROLE], or [EMPLOYEE]?",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the department, role, or employee functions
            if (answer.departmentRoleOrEmployee === "DEPARTMENT") {
                addDEPARTMENT();
            }
            else if (answer.departmentRoleOrEmployee === "ROLE") {
                addROLE();
            }
            else if (answer.departmentRoleOrEmployee === "EMPLOYEE") {
                addEMPLOYEE();
            } else {
                connection.end();
            }
        });
}

// function to handle posting new entries for departments
function addDEPARTMENT() {
    // prompt for info about the department
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the department you would like to add?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was added successfully!");
                    // re-prompt the user for if they want to add department, role, or employee.
                    start();
                }
            );
        });
}
// function to handle posting new entries for roles
function addROLE() {
    // prompt for info about the role
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What is the role you would like to add?"
            }
            {
                name: "salary",
                type: "input",
                message: "What is the salary?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
            {
                name: "deptNum",
                type: "input",
                message: "What is the department number?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.deptNum
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was added successfully!");
                    // re-prompt the user for if they want to add department, role, or employee.
                    start();
                }
            );
        });
}

// function to handle posting new entries for employee
function addEMPLOYEE() {
    // prompt for info about the role
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee you would like to add?"
            }
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee you would like to add?"
            }
            {
                name: "roleID",
                type: "input",
                message: "What is the role id of this employee?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
            {
                name: "managerID",
                type: "input",
                message: "What is the manager id of this employee?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was added successfully!");
                    // re-prompt the user for if they want to add department, role, or employee.
                    start();
                }
            );
        });
}