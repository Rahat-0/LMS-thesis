const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookschema = mongoose.Schema({
  title: { type: String, required: true },
  author: {type : String, required: true},
  year: Number,
  image: { type: String, default: "defaultBook.png" },
  about: String,
  copy: {type : Number, default : 1 },
  issueUser: [{ type : mongoose.Types.ObjectId, ref: "user"}],
  date: { type: Date, default: Date.now() },
  category: {
    type: String,
    default: "none",
  }
});
bookschema.plugin(AutoIncrement, {
  inc_field: "bookId",
  start_seq: 1000,
  inc_amount: 1,
});
const book = new mongoose.model("book", bookschema);

module.exports = book;
