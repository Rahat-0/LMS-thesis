
const testing = require("express").Router();

testing.get('/:id', (req, res)=>{
  const id =  req.params['id']
  res.json(id)
})



module.exports = testing;
