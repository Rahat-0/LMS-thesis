const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  schoolId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  book: [{ type: mongoose.Types.ObjectId, ref: "book" }],
  timeStamp: { type: Date, default: Date.now() },
  userType: {
    type: String,
    enum: ["student", "librarian", "admin"],
    default: "student",
  },
 
});

const userSchema = new mongoose.model("user", userschema);

module.exports = userSchema;
