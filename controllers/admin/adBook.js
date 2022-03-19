const bookSchema = require("../../models/bookSchema");
const adBook = require("express").Router();
const fs = require('fs')
const upload = require('../../middlewares/fileUpload')

adBook.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params['bookId']
    await bookSchema
      .find({bookId})
      .populate(('issueUser'), ('schoolId name email'))
      .exec((err, result) => {
          const {title, bookId, author, year, category, copy, date, image, issueUser} = result[0];
          res.json({title, bookId, author, year, category, copy, date, image, issueUser})
        // res.json({title, bookId, author, year, category, copy, date});
      })
     
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

adBook.get("/", async (req, res) => {
  try {
    await bookSchema
      .find()
      .then((result) => {
          res.json(result)
      })
      .catch(err => res.json({error : 'server error'}))
        
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

adBook.put("/",upload.single("image"), async (req, res)=>{
  const {bookId, title, author, category, about, pre} = req.body;
  const file = req.file;
  console.log(req.body)
  try{
      await bookSchema.updateOne({bookId},{ $set : {title, author, category, about, image : file ? file.filename : pre}})
      .then((result)=>{
          if(file){
              const remove = `./public/image/${pre === 'defaultBook.png' ? null: pre }`
              fs.unlink(remove, (err)=>{
                  if(err){
                      console.log(err)
                  }
              })
          }
          if(result.modifiedCount === 1)
          {
              res.json({message : "update success!"})
          }else if(result.matchedCount === 1 && result.modifiedCount === 0){
              res.json({warn : "nothing changeses yet"})
          } else{
              res.json({error : "update fail!"})
          }  
      })
      .catch(err => res.json(err + " error here"))

  }catch(err){
      if(err){
          res.json(err + ' catch error')
      }
      else{
          res.json({error : " server side error"})
      }
  }
})

adBook.delete("/", (req, res) => {
  res.send("admin with book list router delete");
});

module.exports = adBook;
