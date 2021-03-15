const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SessionSchema = new Schema({
  user_agent: { type: String, required: true},
  username: { type: String, required: true, max: 100 },
});
module.exports = mongoose.model("sessions", SessionSchema);
