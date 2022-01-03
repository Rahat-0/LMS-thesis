const librarianAuth = (req, res, next) => {
    const check = req.userType === "librarian" || req.userType === "admin" ;
    check ? next() : res.json({ error: "only librarian can access" });
    return;
  };
  module.exports = librarianAuth;
  