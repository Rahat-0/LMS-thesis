
const testing = require("express").Router();

testing.get('/', (req, res)=>{
  res.status(404).json({message : 'testing route'})
})



module.exports = testing;
