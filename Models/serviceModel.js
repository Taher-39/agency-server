const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    img: { type: Buffer, required: true },
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
