const adminAuth = (req, res, next) => {
  const check = req.userType === "admin";
  check ? next() : res.json({ error: "only admin can access" });
  return;
};
module.exports = adminAuth;
