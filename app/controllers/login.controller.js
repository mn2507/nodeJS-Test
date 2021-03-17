const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");
const session = require("../models/session.model");
const bcrypt = require("bcrypt");

exports.signIn = function (req, res, next) {
  users.findOne(
    {
      username: req.body.username,
    },
    function (err, userInfo) {
      err ? next(err) : null;
      !userInfo
        ? res.status(403).send({
            errors: "Username Invalid",
          })
        : bcrypt.compare(
            req.body.password,
            userInfo.password,
            function (err, passwordResult) {
              err ? next(err) : null;
              if (passwordResult == true) {
                session.create({
                  user_agent: req.get("User-Agent"),
                  username: userInfo.username,
                });
                const tokenSign = jwt.sign(
                  {
                    username: userInfo.username,
                    id: userInfo._id,
                  },
                  tokenconfig.secret,
                  { expiresIn: "30 days" }
                );
                return res.status(200).send({
                  token: tokenSign,
                  displayusername: userInfo.displayusername,
                  userid: userInfo._id,
                });
              } else {
                return res.status(403).send({
                  errors: "Incorrect Password",
                });
              }
            }
          );
    }
  );
};
