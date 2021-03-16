const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const session = require("../models/session.model");

exports.logOut = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      err
        ? res.status(403).send({
            errors: "Token is not valid",
          })
        : null;
      session.findOneAndRemove({ username: decoded.username }, function (err) {
        err ? next(err) : null
        res.status(200).send("Logged out successfully!");
      });
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
