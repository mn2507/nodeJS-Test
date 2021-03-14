const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");

exports.getProfile = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          errors: "Token is not valid",
        });
      } else {
        users.findById({ _id: decoded.id }, function (err, foundUser) {
          if (err) return next(err);
          res.status(200).send({
            username: foundUser.username,
            displayusername: foundUser.displayusername,
            userid: foundUser._id,
          });
        });
      }
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
