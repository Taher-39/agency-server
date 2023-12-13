const express = require("express");
const router = express.Router();
const {
  uploadOrder,
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/uploadOrder", uploadOrder);

router.get("/getUserOrders", getUserOrders);

router.get("/getTotalOrders", getTotalOrders);

router.patch("/updateStatus/:id", updateOrderStatus);

module.exports = router;
