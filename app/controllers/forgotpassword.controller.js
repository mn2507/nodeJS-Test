var nodemailer = require("nodemailer");
const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.forgotPassword = function (req, res, next) {
  if (!req.body.email) {
    res.status(400).json({
      status: "false",
      message: "Your request body doesn't have email address.",
    });
    return;
  }

  const newPassword = Math.random().toString(36).slice(2);
  console.log("NEW PASSWORD: " + newPassword);

  const email = { username: req.body.email };

  bcrypt.hash(newPassword, SALT_ROUNDS, function (err, hashPassword) {
    err
      ? next(err)
      : usersModel.findOneAndUpdate(
          email,
          { password: hashPassword },
          function (err, results) {
            if (err) {
              res.status(400).send({message: err});
              return;
            }
            if (!results) {
              res.status(200).send({ message: "No email found in database" });
              return;
            } else {
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "angularcarlist@gmail.com",
                  pass: "{{T0TestC@rlist}}",
                },
              });

              var mailOptions = {
                from: "angularcarlist@gmail.com",
                to: req.body.email,
                subject: "Password Reset",
                text: "Your new password is " + newPassword,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  res.status(400).send({message: "Error in Sending Email: " + error});
                } else {
                  console.log("Email sent: " + info.response);
                  res.status(200).send({
                    message: "Your password has been successfully reset.",
                  });
                }
              });
            }
          }
        );
  });
};
