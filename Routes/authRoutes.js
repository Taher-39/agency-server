const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateAmount
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/users/:userId/update-amount", updateAmount);

module.exports = router;
