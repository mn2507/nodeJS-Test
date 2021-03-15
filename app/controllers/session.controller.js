const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const session = require("../models/session.model");
const users = require("../models/users.model");

exports.sessionControl = function (req, res, next) {
  const token = req.get("Authorization");
  const userAgent = req.get("User-Agent");

  if (token) {
    jwt.verify(token, tokenconfig.secret, async (err, decoded) => {
      if (err) {
        return res.status(403).send({
          errors: "Token is not valid",
        });
      } else {
        if (err) return next(err);

        let sessions = await session.find({
          username: decoded.username,
        });
        console.log(
          "🚀 ~ file: session.controller.js ~ line 22 ~ jwt.verify ~ sessions",
          sessions
        );
        res.status(200).send({ sessions: sessions });
      }
    });
  } else {
    return res.status(403).send({
      errors: "Token is not supplied",
    });
  }
};
