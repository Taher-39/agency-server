const User = require("../Models/authModel");
const PasswordReset = require("../Models/passwordResetModel");
const { transporter } = require("../utils/transporter");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");

    // Update user with verification token
    newUser.emailVerificationToken = verificationToken;

    await newUser.save();

    // Send verification email
    const emailOptions = {
      to: newUser.email,
      subject: "Email Verification",
      html: `<p>Please click <a href="${process.env.CLIENT_URL}/verify-email/${verificationToken}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(emailOptions);

    res.status(201).json({ message: "User registered successfully. Verification email sent." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailVerificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token." });
    }

    // Update user verification status
    user.verified = true;
    user.emailVerificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verification successful. User created." });
  } catch (error) {
    res.status(500).json({ message: "Error email verification", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, verified: true });

    if (!user) {
      return res.status(404).json({ message: "User not found or not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


const updateAmount = async (req, res) => {
  const { userId } = req.params;
  const { price } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentWalletPrice = Number(user.amount) - Number(price);
    user.amount = currentWalletPrice;

    await user.save();

    return res
      .status(200)
      .json({ message: "Amount updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not update amount", error: error.message });
  }
};

const changeName = async (req, res) => {
  try {
    const { userId, newName } = req.body;

    await User.findByIdAndUpdate(userId, { name: newName });

    res.status(200).json({ message: "Name updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating name", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set expiration time to 1 hour from now
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    // Save reset token to the database
    const passwordReset = new PasswordReset({
      userId: user._id,
      resetToken,
      expires,
    });
    await passwordReset.save();

    const emailOptions = {
      to: user.email,
      subject: "Password Reset",
      html: `<p>Please click <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">here</a> to reset your password. This link is valid for the next hour.</p>`,
    };

    await transporter.sendMail(emailOptions);

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Error requesting password reset", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const passwordReset = await PasswordReset.findOne({
      resetToken,
      expires: { $gt: new Date() },
      used: false,
    }).populate("userId");

    if (!passwordReset) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const user = passwordReset.userId;
    user.password = await bcrypt.hash(newPassword, 10);
    passwordReset.used = true;

    await Promise.all([user.save(), passwordReset.save()]);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateAmount,
  changeName,
  changePassword,
  verifyEmail,
  requestPasswordReset,
  resetPassword
};
