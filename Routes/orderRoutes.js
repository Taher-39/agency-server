const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
  uploadOrderController,
} = require("../controllers/orderController");

router.post("/upload-order", uploadOrderController);
router.get("/get-user-orders", getUserOrders);
router.get("/get-total-orders", getTotalOrders);
router.patch("/update-status/:id", updateOrderStatus);

module.exports = router;
