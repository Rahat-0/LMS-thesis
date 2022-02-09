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
        const auth = jwt.sign(
          { _id: data._id, userType: data.userType, schoolId: data.schoolId, name : data.name, profile : data.profileImage },
          process.env.JWT_SECRET, {expiresIn : '7d'}
        )
        
        if (isvalid && data.userStatus === 'active') {
          res.json({ validation: true , token : 'bearer '+ auth });
        }
        else if(isvalid && data.userStatus !== 'active'){
          res.json({ error: "your account has been deactivated!" });
        } else {
          res.json({ error: "incorrect school ID or password!" });
        }
      })
      .catch((err) => {
        res.json({ error: "incorrect school ID or password!" });
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
