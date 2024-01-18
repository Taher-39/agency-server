const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payableAmount: { type: Number, required: true },
  paidStatus: { type: Boolean, default: false },
  tran_id: { type: String, required: true },
  pay_initiat: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  amount: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  paymentInfo: [paymentSchema],

  emailVerificationToken: { type: String },
  verified: { type: Boolean, default: false },
});



const User = mongoose.model("User", userSchema);



module.exports = User;
