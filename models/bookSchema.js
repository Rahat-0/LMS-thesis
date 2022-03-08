const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// { type : mongoose.Types.ObjectId, ref:'user'}

const bookschema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  year: Number,
  image: { type: String, default: "defaultBook.png" },
  about: String,
  copy: {type : Number, default : 1 },
  issue: [
   
    { 
      issueUser: { type: mongoose.Types.ObjectId, ref: "user",  unique : true },
      issueDate: { type: Date, default: Date.now() },
      issueValidation : {type : Boolean, default : false}
    },
  ],
  date: { type: Date, default: Date.now() },
  category: {
    type: String,
    default: "none",
  },
  summary: String,
});
bookschema.plugin(AutoIncrement, {
  inc_field: "bookId",
  start_seq: 1000,
  inc_amount: 1,
});
const book = new mongoose.model("book", bookschema);

module.exports = book;
