const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { schoolId, name, password, email, userType, gender } = req.valid;

    const pass = await bcrypt.hash(password, 10);

    const schema = await new userSchema({
      schoolId,
      name,
      password: pass,
      email, 
      userType,
      gender
    });
    await schema.save()
    res.status(201).json({ message: schema });
    
  } catch (err) {
    if (err.keyPattern.schoolId) {
      res.status(200).json({ vError: "schoolId already exist" });
    } else if (err.keyPattern.email) {
      res.status(200).json({ vError: "email already exist" });
    } else if(err){
      res.json(err);
	next(err);
    }else{
      res.status(500).json({ error: "server side error" });
	next(err)
    }
  }
};

module.exports = signup;
