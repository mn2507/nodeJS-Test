const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CarSchema = new Schema(
  {
    carname: { type: String, max: 150 },
    brand: { type: String, required: true, max: 150 },
    description: { type: String, required: true },
  },
);
module.exports = mongoose.model("cars", CarSchema);
