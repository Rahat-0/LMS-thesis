const mongoose = require("mongoose");

const bookschema = mongoose.Schema({
  bookId : String,
  title: {type : String, required : true},
  author: String,
  year: Number,
  image : String,
  student : [{ type : mongoose.Types.ObjectId, ref:'user' }],
  issueDate: { Date, default: Date.now() },
  category: {
    type: String,
    enum: ["Science", "Arts", "Commerce", "none"],
    default: "none",
  }
 
});

const bookSchema = new mongoose.model("book", bookschema);

module.exports = bookSchema;
