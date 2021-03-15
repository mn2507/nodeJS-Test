let jwt = require("jsonwebtoken");
const tokenconfig = require("../config/token");

const verifyToken = (req, res, next, success) => {
  const token = req.headers["Authorization"];
  if (token) {
    jwt.verify(token, tokenconfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Token is not valid",
        });
      } else {
        console.log("Decoded token: " + decoded);
        next();
        return res.status(200).send({
          success: true,
          message: "Token is valid",
        })
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Token is not supplied",
    });
  }
};

module.exports = {
  verifyToken,
};
