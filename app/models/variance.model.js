const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CarVarianceSchema = new Schema({
  car_id: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 150 },
  price: { type: Number, required: true },
});
module.exports = mongoose.model("carvariances", CarVarianceSchema);
