const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
  uploadOrder,
  getOrderDetails,
} = require("../controllers/orderController");
// const upload = require("../Middleware/multerConfig");

router.post("/upload-order", uploadOrder);
router.get("/get-user-orders", getUserOrders);
router.get("/get-total-orders", getTotalOrders);
router.get("/get-order-details/:orderId", getOrderDetails);
router.patch("/update-status/:id", updateOrderStatus);

module.exports = router;
