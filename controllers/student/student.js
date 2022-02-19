const student = require("express").Router();
const schema = require("../../models/userSchema");
const bookschema = require("../../models/bookSchema");
const bcrypt = require("bcrypt");


student.get('/:id', (req, res)=>{
  const id = req.params['id']
  console.log(id)
  res.json(id)
})

student.post("/search", async (req, res) => {
  const { bookId, title, category } = req.body;
  if (bookId) {
    const data = await bookschema.find({ bookId });
    console.log(data);
    res.json(data);
  } else if (title) {
    const data = await bookschema.find({ title });
    console.log(data);
    res.json(data);
  } else if (category) {
    const data = await bookschema.find({ category });
    console.log(data);
    res.json(data);
  } else {
    const data = await bookschema.find();
    console.log(data);
    res.json(data);
  }
});


student.put("/update", async (req, res) => {
  try {
    const id = req._id;
    const { name, email, oldpassword, newpassword } = req.body;

    const find = await schema.findOne({ _id: id });
    const check = await bcrypt.compare(oldpassword, find.password);

    if (
      newpassword.length > 7 &&
      newpassword.match(/[A-Z]/g) &&
      newpassword.match(/[0-9]/g) &&
      newpassword.match(/[a-z]/g)
    ) {
      const password = await bcrypt.hash(newpassword, 10);

      if (check) {
        schema
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


student.delete("/", (req, res) => {
  res.send("student delete");
});

module.exports = student;
