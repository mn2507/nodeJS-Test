const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const session = require("../models/session.model");

exports.sessionControl = function (req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, tokenconfig.secret, async (err, decoded) => {
      err
        ? res.status(403).send({
            errors: "Token is not valid",
          })
        : null;
      err ? next(err) : null;
      let sessions = await session.find({
        username: decoded.username,
      });
      res.status(200).send({ sessions: sessions });
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
