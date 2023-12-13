const mongoose = require("mongoose");

const UploadOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  service: { type: String, required: true },
  option: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: {
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    img: { type: Buffer, required: true },
  },
});

const UploadOrder = mongoose.model("UploadOrder", UploadOrderSchema);

module.exports = UploadOrder;
