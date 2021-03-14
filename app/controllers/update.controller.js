const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");

exports.updateProfile = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          errors: "Token is not valid",
        });
      } else {
        users.findByIdAndUpdate(
          { _id: decoded.id },
          { displayusername: req.body.displayusername },
          function (err, updated) {
            if (err) return next(err);
            res.status(403).send({
              message: "displayusername updated",
            });
          }
        );
      }
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
