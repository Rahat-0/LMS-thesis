const validation = (req, res, next) => {
  try {
    const { schoolId, email, password, userType, name, book, gender } = req.body;

    if (!email) {
      return res.json({ vError: "email can't be empty" });
    } else if (!password) {
      return res.json({ vError: "password can't be empty" });
    } else if (!name) {
      return res.json({ vError: "name can't be empty" });
    }else if(!schoolId){
	return res.json({vError: "schoolId can't be empty"});
    }

    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailCheck = mail.test(email);
    if (!mailCheck) {
      return res.json({vError :"email invalid!"});
    }
    const int = parseInt(schoolId);
    const check = int == schoolId;
    if (!check) {
    return res.json({vError : "schoolId should be number only"});
    }

    if (
      gender !== "male" && gender !== "female"
    ) {
      return res.json({vError : "invalid gender"});
    }

    if (password.length < 7) {
      return res.json({vError : "password must be 8"});
    } else if (
      password.match(/[A-Z]/g) &&
      password.match(/[0-9]/g) &&
      password.match(/[a-z]/g)
    ) {
      req.valid = { schoolId, email, password, userType, name, book, gender };
      next();
    } else {
      return res.json(
       {vError : "password must be include upercase, lowercase and number"}
      );
    }
  } catch (error) {
    next(error);
    return;
  }
};
module.exports = validation;
