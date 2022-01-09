const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { schoolId, password } = req.body;
    userSchema
      .findOne({ schoolId })
      .then(async (data) => {
        const isvalid = await bcrypt.compare(password, data.password);
        const athentication = jwt.sign(
          { _id: data._id, userType: data.userType, schoolId: data.schoolId },
          process.env.JWT_SECRET
        );
        if (isvalid) {
          console.log(athentication);
          res.json({ validation: true , token : athentication});
        } else {
          res.json({ error: "id or password has incorrect!" });
        }
      })
      .catch((err) => {
        res.json({ error: "id or password has incorrectttttt!" });
      });
  } catch (err) {
    if (err) {
      res.json(err);
    } else {
      res.status(500).json({ error: "server side error" });
    }
  }
};

module.exports = login;
