const book = require("express").Router();
const bookValidation = require("../../middlewares/bookValidation");
const bookSchema = require("../../models/bookSchema");

book.post("/", bookValidation, async (req, res) => {
  try {
    // const id = req._id;
    // console.log(id);
    const { title, author, year, image, about, category } = req.valid;
    const bookschema = await new bookSchema({
      title,
      author,
      year,
      category,
      student,
      about,
      image,
    });
    await bookschema.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        res.json(result);
      }
    });
  } catch (err) {
    res.json(err);
  }
});

book.get("/", (req, res) => {
  bookSchema
    .find()
    .populate("student", "schoolId name email")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

book.put("/", (req, res) => {});
book.delete("/", (req, res) => {
  res.send("book delete");
});

module.exports = book;
