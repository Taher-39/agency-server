const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
  uploadOrderController,
} = require("../controllers/orderController");

router.post("/uploadOrder", uploadOrderController);

router.get("/getUserOrders", getUserOrders);

router.get("/getTotalOrders", getTotalOrders);

router.patch("/updateStatus/:id", updateOrderStatus);

module.exports = router;
