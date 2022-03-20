const book = require("express").Router();
const fs = require('fs')
const upload = require('../../middlewares/fileUpload')
const Auth = require("../../middlewares/Auth");
const librarianAuth = require("../../middlewares/librarianAuth");
const bookValidation = require("../../middlewares/bookValidation");
const bookSchema = require("../../models/bookSchema");
const issueSchema = require("../../models/issueSchema");
const issue = require("./issue");



book.put("/", Auth, librarianAuth, async (req, res)=>{
  const {bookId} = req.body;
  
  try{
      await bookSchema.find({bookId})
       .then((result)=>{
           const {bookId, title, author, year, image, about, copy, category} = result[0];
          res.json({bookId, title, author, year, image, about, copy, category})
       })
       .catch(err =>{
           console.log(err)
           res.send(err)
       })

   }catch(err){
       res.send(err)
       console.log(err)
   }
});

book.get("/all", (req, res) => {
  bookSchema
    .find()
    .limit()
    .populate('issueUser', "name email gender ")
    .exec(( err , data) => {
      if(err){
        console.log(err);
        res.send(err);
      }else{

        res.send(data);
      }
    })
    
});

book.get("/:id", async (req, res)=>{
  try{
    const id = req.params['id']
    
    const result = await bookSchema.findOne({bookId : id}).populate('issueUser', 'name email schoolId')
    console.log(result)
    const bookCounts = await issueSchema.count({issueBook : result._id})
      const available = result.copy - bookCounts;
      const availability = bookCounts < result.copy;
      const hold = 0 ;
      const {title, name, bookId, about,  image, copy, _id} = result;
      res.json({available, title, name, bookId, about, availability, image, copy, hold, _id})

  }catch(err){
    console.log(err)
    res.send('bad request')
  }

})






book.use('/issue',Auth, issue);

module.exports = book;
