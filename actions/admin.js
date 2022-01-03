const admin = require("express").Router();

admin.get("/", (req, res) => {
  const id = req.schoolId;
  res.json({message : id})
});

admin.post("/", (req, res) => {
  res.send("admin post");
});
admin.put("/", (req, res) => {
  res.send("admin put");
});
admin.delete("/", (req, res) => {
  res.send("admin delete");
});

module.exports = admin;
