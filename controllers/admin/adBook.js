const bookSchema = require("../../models/bookSchema");
const adBook = require("express").Router();

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

adBook.post("/", (req, res) => {
  res.send("admin with book list router post");
});

adBook.put("/", (req, res) => {
  res.send("admin with book list router put");
});

adBook.delete("/", (req, res) => {
  res.send("admin with book list router delete");
});

module.exports = adBook;
