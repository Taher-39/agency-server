const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/change-name", authController.changeName);
router.post("/change-password", authController.changePassword);
router.get("/verify-email/:token", authController.verifyEmail);

router.post("/request-password-reset", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPassword);

router.put("/users/:userId/update-amount", authController.updateAmount);
router.delete("/delete-account/:userId", authController.deleteAccount);

module.exports = router;
