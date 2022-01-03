const librarian = require("express").Router();

librarian.get("/", (req, res) => {
  res.json({message : "librarian route here"})
});

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