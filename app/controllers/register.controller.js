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
      err ? next(err) : null;
      userExists
        ? res.status(403).send({
            errors: "Username already exists",
          })
        : bcrypt.hash(
            req.body.password,
            SALT_ROUNDS,
            function (err, hashPassword) {
              err
                ? next(err)
                : users.create(
                    {
                      username: req.body.username,
                      password: hashPassword,
                      displayusername: req.body.displayusername,
                    },
                    function (err, userCreated) {
                      err ? next(err) : null;
                      const tokenSign = jwt.sign(
                        {
                          username: userCreated.username,
                          displayusername: userCreated.displayusername,
                          id: userCreated._id,
                        },
                        tokenconfig.secret,
                        { expiresIn: "30 days" }
                      );
                      res.status(200).send({
                        token: tokenSign,
                        displayusername: userCreated.displayusername,
                        userid: userCreated._id,
                      });
                    }
                  );
            }
          );
    }
  );
};
