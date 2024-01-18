const express = require("express");
const router = express.Router();
const { sendEmail } = require("../Controllers/emailController");

router.post("/send-email", sendEmail);

module.exports = router;
