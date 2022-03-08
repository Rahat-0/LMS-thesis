const librarian = require("express").Router();
const userSchema = require('../../models/userSchema');
const libStudent = require("./libStudent");
const libBooks = require("./libBooks");
const libDashboard = require("./libDashboard");
const libIssue = require("./libIssue");

librarian.use("/students", libStudent)
librarian.use("/books", libBooks)
librarian.use("/dashboard", libDashboard)
librarian.use('/issue', libIssue)

librarian.post("/", (req, res) => {
  res.send("librarian post");
});
librarian.put("/", (req, res) => {
  res.send("librarian put");
});
librarian.delete("/", (req, res) => {
  res.send("librarian delete");
});


module.exports = librarian