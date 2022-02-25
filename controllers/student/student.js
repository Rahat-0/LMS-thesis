const student = require("express").Router();
const userSchema = require("../../models/userSchema");
const bookSchema = require("../../models/bookSchema");
const bcrypt = require("bcrypt");

student.get("/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const { schoolId, name, email, gender, profileImage, userType, bio, mobile } =
      await userSchema.findOne({ schoolId: id });
    res.json({ schoolId, name, email, gender, profileImage, userType, bio, mobile });
  } catch (err) {
    res.json("server side error " + err);
  }
});

student.put("/status", async (req, res) => {
  try {
    const { schoolId } = req.body;
    const result = await userSchema.updateOne(
      { schoolId },
      { $set: { userStatus: "deactive" } }
    );
    console.log(result);
    if (result.modifiedCount === 1) {
      res.json({ message: "success" });
    } else {
      res.json({ error: "status update fail" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "status update fail" });
  }
});

student.post("/search", async (req, res) => {
  const { bookId, title, category } = req.body;
  if (bookId) {
    const data = await bookSchema.find({ bookId });
    console.log(data);
    res.json(data);
  } else if (title) {
    const data = await bookSchema.find({ title });
    console.log(data);
    res.json(data);
  } else if (category) {
    const data = await bookSchema.find({ category });
    console.log(data);
    res.json(data);
  } else {
    const data = await bookSchema.find();
    console.log(data);
    res.json(data);
  }
});

student.put("/reset", async (req, res) => {
  try {
    const id = req._id;
    const { name, email, oldpassword, newpassword } = req.body;

    const find = await userSchema.findOne({ _id: id });
    const check = await bcrypt.compare(oldpassword, find.password);

    if (
      newpassword.length > 7 &&
      newpassword.match(/[A-Z]/g) &&
      newpassword.match(/[0-9]/g) &&
      newpassword.match(/[a-z]/g)
    ) {
      const password = await bcrypt.hash(newpassword, 10);

      if (check) {
        userSchema
          .updateOne({ _id: id }, { $set: { name, email, password } })
          .then((result) => {
            console.log(result);
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      } else {
        res.json({ message: "update failed (password incorrect!)" });
      }
    } else {
      res.json({
        error:
          "please enter valid password ( number, upercase and lowercase, more then 8 character)",
      });
    }
  } catch (err) {
    if (err) {
      res.json(err);
    } else {
      res.json("server side error! data can't update yet");
    }
  }
});

student.put("/update", async (req, res) => {
  try {
    const id = req._id;
    const { name, email, mobile, gender, bio } = req.body;

    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailCheck = mail.test(email);
    if(!mailCheck){
      return  res.json({error : 'email invalid'})
    }
    if(mobile.length > 15){
      return res.json({error : 'mobile number invalid'})
    }
    if(bio.length > 500){
      return res.json({error : 'invalid length of bio'})
    }
    userSchema
      .updateOne({ _id: id }, { $set: { name, email, mobile, gender, bio } })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } catch (err) {
    if (err) {
      res.json(err);
    } else {
      res.json("server side error! data can't update yet");
    }
  }
});

student.delete("/", (req, res) => {
  res.send("student delete");
});

module.exports = student;
