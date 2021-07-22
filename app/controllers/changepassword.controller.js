const users = require("../models/users.model");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.changePassword = function (req, res, next) {
  if (
    !req.body.currentpassword ||
    !req.body.newpassword ||
    !req.body.email
  ) {
    res.status(400).json({
      status: "false",
      message: "Your request body does not have enough information.",
    });
    return;
  }

  const email = { username: req.body.email };

  users.findOne(email, function (err, userInfo) {
    err ? next(err) : null;
    !userInfo
      ? res.status(403).send({
          message: "Username does not exist",
        })
      : bcrypt.compare(
          req.body.currentpassword,
          userInfo.password,
          function (err, passwordResult) {
            err ? next(err) : null;
            if (passwordResult == true) {
              bcrypt.hash(
                req.body.newpassword,
                SALT_ROUNDS,
                function (err, encryptedPassword) {
                  err
                    ? next(err)
                    : users.findOneAndUpdate(
                        email,
                        {
                          password: encryptedPassword,
                        },
                        function (err) {
                          if (err) {
                            res.status(400).send({ message: "Error: " + err });
                            return;
                          } else {
                            res.status(200).send({
                              message: "Your password has been updated!",
                            });
                          }
                        }
                      );
                }
              );
            } else {
              return res.status(200).send({
                message: "Incorrect Current Password",
              });
            }
          }
        );
  });
};
