const express = require("express");
const signup = require("../controllers/signup");
const test = require("../controllers/test");
const login = require("../controllers/login");
const Auth = require("../middlewares/Auth");
const admin = require("../controllers/admin");
const librarian = require("../controllers/librarian");
const adminAuth = require("../middlewares/adminAuth");
const librarianAuth = require("../middlewares/librarianAuth");
const userValidation = require("../middlewares/userValidation");
const student = require("../controllers/student");
const book = require("../controllers/book");
const router = express.Router();

//test route
router.get("/test", test);

// public api
router.post("/signup", userValidation, signup);
router.post("/login", login);

// book api (protected)
router.use("/book", Auth, book)

// student api (protected)
router.use("/student", Auth, student);

// admin api (protected)
router.use("/admin", Auth, adminAuth, admin);

//librarian api (protected)
router.use("/librarian", Auth, librarianAuth, librarian);



//route protected using checkinAuth middleware
router.get("/mainhome", Auth, (req, res) => {
  const type = req.userType;
  res.send(type);
});

//error handler
router.use((err, req, res, next)=>{
  if(err){
    console.log('custom' + err)
    res.json('custom server site error here' + err )
  }
 next()
})

module.exports = router;
