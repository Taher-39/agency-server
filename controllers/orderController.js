const UploadOrder = require("../Models/orderModel");

const uploadOrderController = async (req, res) => {
  try {
    const { name, email, description, status, service, option, price } =
      req.body;

    const newOrder = new UploadOrder({
      name,
      email,
      status,
      description,
      service,
      option,
      price,
    });

    await newOrder.save();
    res.json({ message: "Order uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error uploading order", message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const { email } = req.query;

  try {
    const userOrders = await UploadOrder.find({ email });

    res.status(200).json(userOrders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch user orders", error: error.message });
  }
};

const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await UploadOrder.find();
    res.json(totalOrders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch total orders", message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await UploadOrder.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not update order status", message: error.message });
  }
};

const hasUserOrdered = async (email) => {
  try {
    const orders = await UploadOrder.find({ email: email });
    return orders.length > 0;
  } catch (error) {
    throw new Error("Error checking user orders");
  }
};

module.exports = {
  uploadOrderController,
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
  hasUserOrdered,
};
