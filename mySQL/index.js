const { application } = require('express');
const express = require('express');
const mySQL = require('mysql');

//Create connection

const db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "(0nnoYe5.",
    database: "nodeMySQL"
});

//Connect to MySQL

db.connect(err => {
    if (err) {
        throw err
    }
    console.log("MySQL connected!");
});

const app = express();

//Create Database

app.get("/createDb", (req, res) => {
    let sql = "CREATE DATABASE nodeMySQL";
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Database created");
    });
});


//Create a Table
app.get("/createEmployee", (req, res) => {
    let sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(50), designation VARCHAR(150), PRIMARY KEY(id))"
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Employee table was created");
    });
});

//Insert employee record
app.get("/addEmployee", (req, res) => {
    let post = { name: "Krystal Gordon", designation: "Property Manager" };
    let sql = "INSERT INTO employee SET ?";
    let query = db.query(sql, post, err => {
        if (err) {
            throw err;
        }
        res.send("Employee was added");
    });
});

//Retrieve all employee record
app.get("/getEmployee", (req, res) => {
    let sql = "SELECT * FROM employee";
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send("Employee details fetched");
    });
});

//Update an employee record
app.get("/updateEmployee/:id", (req, res) => {
    let newName = "Jonelle Narra";
    let sql = `UPDATE employee SET name='${newName}' WHERE id=${req.params.id}`
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Employee record was updated");
    });
});

//Delete an employee record
app.get("/deleteEmployee/:id", (req, res) => {
    let sql = `DELETE FROM employee WHERE id=${req.params.id}`
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Employee record was deleted");
    });
});

app.listen("3000", () => {
    console.log("Service started on port 3000!");
});