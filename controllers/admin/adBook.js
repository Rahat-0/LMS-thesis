const bookSchema = require("../../models/bookSchema");
const adBook = require("express").Router();

adBook.get("/", async (req, res) => {
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
