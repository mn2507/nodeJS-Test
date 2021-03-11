const users = require("../models/users.model");
const tokenconfig = require("../config/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.signUp = function (req, res, next) {
  users.findOne(
    {
      username: req.body.username,
    },
    function (err, userExists) {
      if (err) {
        next(err);
      } else {
        if (userExists) {
          return res.status(403).send({
            errors: "Username already exists",
          });
        } else {
          bcrypt.hash(
            req.body.password,
            SALT_ROUNDS,
            function (err, hashPassword) {
              if (err) {
                next(err);
              } else {
                users.create(
                  {
                    username: req.body.username,
                    password: hashPassword,
                    displayusername: req.body.displayusername,
                  },
                  function (err, userCreated) {
                    if (err) {
                      next(err);
                    } else {
                      const tokenSign = jwt.sign(
                        {
                          username: userCreated.username,
                          displayusername: userCreated.displayusername,
                        },
                        tokenconfig.secret,
                        { expiresIn: "30 days" }
                      );
                      res.status(200).send({
                        token: tokenSign,
                        displayusername: userCreated.displayusername,
                        userid:userCreated._id,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};
