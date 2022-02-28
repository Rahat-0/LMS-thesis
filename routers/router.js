const express = require("express");
const signup = require("../controllers/signup");
const test = require("../controllers/test");
const login = require("../controllers/login");
const Auth = require("../middlewares/Auth");
const adminAuth = require("../middlewares/adminAuth");
const librarianAuth = require("../middlewares/librarianAuth");
const userValidation = require("../middlewares/userValidation");
const admin = require("../controllers/admin/admin");
const librarian = require("../controllers/librarian/librarian");
const student = require("../controllers/student/student");
const book = require("../controllers/book/book");
const router = express.Router();

//test route
router.use("/test", test);

// public api
router.post("/signup", userValidation, signup);
router.post("/login", login);

// book api (protected)
router.use("/book", book)

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
router.use((error, req, res, next)=>{
  if(error){
    console.log(error)
    res.json('custom server site error here' + {error} )
  }
 next()
})

module.exports = router;
