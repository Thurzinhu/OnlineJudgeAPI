const verifyJWT = require("./verifyJWT");

const verifyAuth = (req, res, next) => {
  // If user is authenticated via session (Google OAuth)
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.userId = req.user.id;
    return next(); // Proceed if the user is logged in via Passport.js
  }
  
  // Check if user is authenticated via JWT
  verifyJWT(req, res, next);
};

module.exports = verifyAuth;