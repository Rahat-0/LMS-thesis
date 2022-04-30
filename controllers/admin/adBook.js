const adBook = require("express").Router();
const fs = require('fs')
const bookSchema = require("../../models/bookSchema");
const upload = require('../../middlewares/fileUpload')
const bookValidation = require('../../middlewares/bookValidation')


adBook.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params['bookId']
    await bookSchema
      .find({bookId})
      .populate(('issueUser'), ('schoolId name email'))
      .exec((err, result) => {
          const {title, bookId, author, year, category, copy, date, image, issueUser} = result[0];
          const dates = new Date(date).toLocaleDateString()
          res.json({title, bookId, author, year, category, copy, date : dates, image, issueUser})
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

adBook.post("/",  upload.single('image'), bookValidation, async (req, res) => {
  try{
  const { title, author, year, about, category, copy} = req.valid;
  const image = req.file ? req.file.filename : undefined
  const schema = await new bookSchema({
    title,
    author,
    year,
    category,
    about,
    copy,
    image,
  });
  await schema.save((err, result) => {
    if (err) {
      console.log(err);
      res.json(err)
    } else {
      console.log("success");
      res.status(201).json(result);
    }
  });
}catch(err){
  console.log(err)
  res.json(err)
}

});

adBook.put("/",upload.single("image"), async (req, res)=>{
  const {bookId, title, author, category, copy, about, year, pre} = req.body;
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

adBook.delete("/", async (req, res) => {
  try{
    const {bookId} = req.body;
    const data = await bookSchema.deleteOne({bookId})
    if(data.deletedCount === 1){
        res.json({message : 'delete success'})
    }else{
        res.json({message : 'delete fail!'})
    }
    

}catch(err){
    console.log(err.message)
    res.json(err.message)
}
});

module.exports = adBook;
