const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getTotalOrders,
  uploadOrderController,
  updateOrderStatus,
} = require("../Controllers/orderController");

router.post("/upload-order", uploadOrderController);
router.get("/get-user-orders", getUserOrders);
router.get("/get-total-orders", getTotalOrders);
router.patch("/update-status/:id", updateOrderStatus);

module.exports = router;
