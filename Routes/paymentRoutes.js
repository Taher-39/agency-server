const express = require("express");
const router = express.Router();
const {
  addMoney,
  paymentSuccess,
  paymentFail,
} = require("../Controllers/paymentController");

router.post("/addMoney", addMoney);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);

module.exports = router;
