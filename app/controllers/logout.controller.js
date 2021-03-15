const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");
const session = require("../models/session.model");

exports.logOut = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Token is not valid",
        });
      } else {
        session.findOneAndRemove(
          { username: decoded.username },
          function (err) {
            if (err) return next(err);
            res.status(200).send("Logged out successfully!");
          }
        );
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Token is not supplied",
    });
  }
};
