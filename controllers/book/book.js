const book = require("express").Router();
const Auth = require("../../middlewares/Auth");
const bookValidation = require("../../middlewares/bookValidation");
const bookSchema = require("../../models/bookSchema");
const issueSchema = require("../../models/issueSchema");
const issue = require("./issue");

book.post("/", bookValidation, async (req, res) => {
    try{
    // const id = req._id;
    // console.log(id);
    
    const { title, author, year, image, about, category, issue } = req.valid;
    
    const schema = await new bookSchema({
      title,
      author,
      year,
      category,
      issue,
      about,
      image,
    });
    await schema.save((err, result) => {
      if (err) {
        console.log(err);
        res.json(err)
      } else {
        console.log("success");
        res.json(result);
      }
    });
  }catch(err){
    console.log(err)
    res.json(err)
  }
 
});

book.get("/all", (req, res) => {
  bookSchema
    .find()
    .limit()
    .populate('issue.issueUser', "name email gender ")
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
    
    const result = await bookSchema.findOne({bookId : id}).populate('issue.issueUser', 'name email schoolId')
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

book.delete("/", (req, res) => {
  res.send("book delete");
});

book.use('/issue',Auth, issue)

module.exports = book;
