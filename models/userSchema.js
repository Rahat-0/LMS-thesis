const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  schoolId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender : {type : String, required : true, enum : ["male", "female"]},
  password: { type: String, required: true },
  profileImage : {type : String},
  book: [{ type: mongoose.Types.ObjectId, ref: "book" }],
  userType: {
    type: String,
    enum: ["student", "librarian", "admin"],
    default: "student",
  },
  timeStamp: { type: Date, default: Date.now() }
 
});

const userSchema = new mongoose.model("user", userschema);

module.exports = userSchema;
