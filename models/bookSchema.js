const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bookschema = mongoose.Schema({
  title: {type : String, required : true},
  author: String,
  year: Number,
  image : {type : String, default : 'defaultBook.png'},
  about : String,
  student : { type : mongoose.Types.ObjectId, ref:'user' },
  issueDate: { type : Date, default: Date.now() },
  category: {
    type: String,
    default: "none",
  }
 
}); 
bookschema.plugin(AutoIncrement, {inc_field: 'bookId', start_seq : 1000, inc_amount : 1});
const book = new mongoose.model("book", bookschema);

module.exports = book;
