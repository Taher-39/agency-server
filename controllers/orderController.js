const Order = require('../Models/orderModel');
const Service = require('../Models/serviceModel');

const uploadOrder = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, description, status, service, option, price } = req.body;

    await Service.updateOne({ _id: service }, { $inc: { orderCount: 1 } });

    const newOrder = new Order({
      name,
      email,
      description,
      status,
      service,
      option,
      price,
    });

    await newOrder.save();

    res.json({ message: 'Order uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading order', message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  const { email } = req.query;

  try {
    const userOrders = await Order.find({ email });

    const ordersWithDetails = await Promise.all(
      userOrders?.map(async (order) => {
        const service = await Service.findById(order.service);
        const option = service.prices.find((price) => price._id.toString() === order.option.toString());

        return {
          ...order.toObject(),
          serviceName: service.name,
          optionName: option.subcategory,
        };
      })
    );

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch user orders", error: error.message });
  }
};


const getTotalOrders = async (req, res) => {
  try {
    const totalUserOrders = await Order.find();

    const ordersWithDetails = await Promise.all(
      totalUserOrders?.map(async (order) => {
        const service = await Service.findById(order.service);
        const option = service.prices.find((price) => price._id.toString() === order.option.toString());

        return {
          ...order.toObject(),
          serviceName: service.name,
          optionName: option.subcategory,
        };
      })
    );

    res.status(200).json(ordersWithDetails);
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
    const updatedOrder = await Order.findByIdAndUpdate(
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
    const orders = await Order.find({ email: email });
    return orders.length > 0;
  } catch (error) {
    throw new Error("Error checking user orders");
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const orderDetails = await Order.findById(orderId);

    if (!orderDetails) {
      return res.status(404).json({ error: "Order not found" });
    }

    const service = await Service.findById(orderDetails.service);
    const option = service.prices.find((price) => price._id.toString() === orderDetails.option.toString());

    const userOrderDetails = {
      ...orderDetails.toObject(),
      serviceName: service.name,
      duration: option.duration,
      optionName: option.subcategory,
    };

    res.status(200).json(userOrderDetails);

  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadOrder,
  getUserOrders,
  getTotalOrders,
  updateOrderStatus,
  hasUserOrdered,
  getOrderDetails
};
