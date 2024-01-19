const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  orderCount: { type: Number, default: 0 },
  prices: [
    {
      subcategory: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
