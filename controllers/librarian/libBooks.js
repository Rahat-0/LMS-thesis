const libBooks = require('express').Router()
const fs = require('fs')
const bookSchema = require('../../models/bookSchema')
const upload = require('../../middlewares/fileUpload')

libBooks.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params['bookId']
    await bookSchema
      .find({bookId})
      .populate(('issueUser'), ('schoolId name email'))
      .exec((err, result) => {
        console.log(result)
          const {title, bookId, author, year, category, copy, date, image, issueUser} = result[0];
          res.json({title, bookId, author, year, category, copy, date, image, issueUser})
      })
     
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

libBooks.get('/', async (req, res)=>{
    try {
        await bookSchema
          .find()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
      } catch (err) {
        res.send(err);
        console.log(err);
      }
}) 

libBooks.put("/",upload.single("image"), async (req, res)=>{
  const {bookId, title, author, category, about, year, copy, pre} = req.body;
  const file = req.file;
  console.log(req.body)
  try{
      await bookSchema.updateOne({bookId},{ $set : {title, author, category, about, year, copy, image : file ? file.filename : pre}})
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


module.exports = libBooks;