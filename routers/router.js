const express = require("express");
const signup = require("../actions/signup");
const login = require("../actions/login");
const checkin = require("../middlewares/checkin");
const admin = require("../actions/admin");
const librarian = require("../actions/librarian");
const adminCheck = require("../middlewares/adminCheck");
const librarianCheck = require("../middlewares/librarianCheck");
const router = express.Router();

// public api
router.post("/signup", signup);
router.post("/login", login);

// admin api (protected)
router.use("/admin",checkin, adminCheck, admin)

//librarian api (protected)
router.use("/librarian",checkin,librarianCheck, librarian)


//route protected using checkin middleware
router.get("/home", checkin, (req, res) => {
  const type = req.userType;
  res.send(type);
});

module.exports = router;
