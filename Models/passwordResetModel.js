
const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resetToken: { type: String, required: true },
    expires: { type: Date, required: true },
    used: { type: Boolean, default: false },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;
