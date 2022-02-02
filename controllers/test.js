const fs = require('fs')
const upload = require('../middlewares/fileUpload')
const testing = require("express").Router();

testing.get("/upload", async (req, res) => {
  const sendPath = "./public/image/1643801964682Screenshot (5).png";

  fs.unlink(sendPath, (err)=>{
    if(err){
      console.log(err)
      res.json({error : err})
    }else{
      res.send('delete success')
    }
  })
  
});

testing.post("/upload", upload.single("proImage"), (req, res) => {
  try {
    const file = req.file;
    const sendPath = file.filename;

  res.json(sendPath);
    
  } catch (err) {
    res.json("error here");
  }
});

module.exports = testing;
