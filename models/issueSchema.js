const mongoose = require("mongoose");

const issueschema = mongoose.Schema({
      issueUser: { type: mongoose.Types.ObjectId, ref: "user" },
      issueDate: { type: Date, default: Date.now() },
      issueValidation : {type : Boolean, default : false},
      issueBook : { type: mongoose.Types.ObjectId, ref: "book" }
});

const issueSchema = new mongoose.model("issue", issueschema);

module.exports = issueSchema;
