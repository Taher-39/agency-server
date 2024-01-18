const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateAmount,
  changeName,
  changePassword,
  verifyEmail,
  requestPasswordReset,
  resetPassword
} = require("../Controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-name", changeName);
router.post("/change-password", changePassword);
router.get("/verify-email/:token", verifyEmail);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.put("/users/:userId/update-amount", updateAmount);

module.exports = router;
