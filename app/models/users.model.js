const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 50 },
    displayusername: { type: String, required: true, max: 500 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UserSchema);
