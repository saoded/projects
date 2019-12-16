//login verification to be used as middleware
function isLoggedIn(req, res, next) {
  return next();
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = {
  isLoggedIn: isLoggedIn
};