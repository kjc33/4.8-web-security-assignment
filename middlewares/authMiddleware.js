const jwt = require("jsonwebtoken");

// Middleware to Check If the User is Authenticated
const authenticateJWT = (req, res, next) => {
  // Get the Token from the Request Header
  const token = req.headers.authorization;

  // Check If the Token Exists
  if (token) {
    // Check If the Token is Valid
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // If the Token is Not Valid, Return an Error
        return res.status(401).json({
          message: "Invalid token",
        });
      } else {
        // If the Token is Valid, Set the User to the Decoded User
        req.user = decoded;
        next();
      }
    });
  } else {
    // If the Token Does Not Exist, Return an Error
    return res.status(401).json({
      message: "Token not found",
    });
  }
};

module.exports = {
  authenticateJWT,
};
