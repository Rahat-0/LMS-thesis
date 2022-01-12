const userSchema = require('../models/userSchema')
const admin = require("express").Router();

admin.get("/", (req, res) => {
  const id = req.schoolId;
  try{
    userSchema.find()
   .then(data =>{
     res.json(data)
   })
   .catch(err =>{
     console.log(err)
   })

  }catch(err){
    res.json({error : err})
  }
   
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
