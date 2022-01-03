const express = require("express");
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const Auth = require("../middlewares/Auth");
const admin = require("../controllers/admin");
const librarian = require("../controllers/librarian");
const adminAuth = require("../middlewares/adminAuth");
const librarianAuth = require("../middlewares/librarianAuth");
const router = express.Router();

// public api
router.post("/signup", signup);
router.post("/login", login);

// admin api (protected)
router.use("/admin",Auth, adminAuth, admin)

//librarian api (protected)
router.use("/librarian",Auth,librarianAuth, librarian)


//route protected using checkinAuth middleware
router.get("/home", Auth, (req, res) => {
  const type = req.userType;
  res.send(type);
});

module.exports = router;
