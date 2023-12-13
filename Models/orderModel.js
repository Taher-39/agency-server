const mongoose = require("mongoose");

const uploadOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  service: { type: String, required: true },
  option: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const UploadOrder = mongoose.model("UploadOrder", uploadOrderSchema);

module.exports = UploadOrder;
