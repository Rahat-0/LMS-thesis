const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { schoolId, name, password, email, userType } = req.valid;

    const pass = await bcrypt.hash(password, 10);

    const schema = await new userSchema({
      schoolId,
      name,
      password: pass,
      email, 
      userType
    });
    await schema.save();
    res.status(201).json({ message: schema });
  } catch (err) {
    if (err.keyPattern.schoolId) {
      res.status(409).json({ error: "schoolId already exist" });
    } else if (err.keyPattern.email) {
      res.status(409).json({ error: "email already exist" });
    } else if(err){
      res.json(err);
    }else{
      res.status(500).json({ error: "server side error" });
    }
  }
};

module.exports = signup;
