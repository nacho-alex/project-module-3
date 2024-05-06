const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.checkAuth = (req, res, next) => {
    // 1 - extract JWT from Authorization Header
    const [schema, token] = req.headers?.authorization.split(' ');
    switch (schema.toUpperCase()) {
      case 'BEARER':
        // 2 - verify JWT signature (jwt.verify)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: err.message });
          }
  
          // 3 - extract "sub" from jwt payload
          const sub = decoded.sub;
  
          // 4 - load user from databse
          User.findById(sub)
            .then((user) => {
              if (user) {
                // 5 - save user on request (req.user)
                req.user = user;
                // 6 - next
                next();
              } else {
                res.status(401).json({ message: "Unauthorized" });
              }
            })
            .catch(next);
        });
        break;
      default:
        res.status(401).json({ message: `Unsupported authorization schema ${schema}` });
    }
  };