const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");

exports.updateProfile = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      err
        ? res.status(403).send({
            errors: "Token is not valid",
          })
        : null;
      users.findByIdAndUpdate(
        { _id: decoded.id },
        { displayusername: req.body.displayusername },
        function (err, updated) {
          err ? next(err) : null;
          res.status(200).send({
            message: "displayusername updated",
          });
        }
      );
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
