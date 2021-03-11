const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const users = require("../models/users.model");
const bcrypt = require("bcrypt");

exports.signIn = function (req, res, next) {
    console.log(req.body)
  users.findOne(
    {
      username: req.body.username,
    },
    function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (!userInfo) {
          console.log("userinfo " + userInfo);
          return res.status(403).send({
            errors: "Username Invalid",
          });
        } else {
          bcrypt.compare(
            req.body.password,
            userInfo.password,
            function (err, passwordResult) {
              if (err) {
                next(err);
              } else if (passwordResult == true) {
                const tokenSign = jwt.sign(
                  {
                    username: userInfo.username,
                    displayusername: userInfo.displayusername,
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
      }
    }
  );
};
