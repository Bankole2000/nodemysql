const express = require("express");
const mysql = require("mysql");

// Create mysql connection
const db = mysql.createConnection({
  host: "192.168.64.2",
  user: "root",
  password: "root",
  database: "nodemysql"
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql Connected");
});

const app = express();

// create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

// Insert single post
app.get("/addpost", (req, res) => {
  let post = {
    title: "This is a cool post",
    body: `Here's the main gist of the post`
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post with id - ${result.insertId} created`);
  });
});

// Add another post
app.get("/addsecondpost", (req, res) => {
  let post = {
    title: "Another Post for y'all",
    body: `Mysql with NodeJS is really super cool`
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post with id - ${result.insertId} created`);
  });
});

// Select all posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(`Posts Fetched - ${JSON.stringify(results)}`);
  });
});

// Update posts by id
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "New Title yo";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Posts Updated - ${JSON.stringify(result)}`);
  });
});

// Delete posts by id
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      res.send(`Posts with id - ${req.params.id} successfully deleted`);
    } else {
      res.send(`Couldn't find post with id - ${req.params.id}`);
    }
  });
});

// Get single posts by id
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post Fetched - ${JSON.stringify(result[0])}`);
  });
});

// Create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("'posts' table created");
  });
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});
