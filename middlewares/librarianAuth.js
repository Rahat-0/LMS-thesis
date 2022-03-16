const userSchema = require('../models/userSchema')
const librarianAuth = (req, res, next) => {
    const check = req.userType === "librarian" || req.userType === "admin" ;
    const status = req.status === 'active';
    check && status ? next() : res.json({ error: "only librarian can access" });
    return;
  };
  module.exports = librarianAuth;
  