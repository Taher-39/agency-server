const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' },
  service: { type: String, required: true },
  option: { type: String, required: true },
  price: { type: Number, required: true },
  // file: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

