const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({
      userId: req.user._id,
      items,
      totalPrice,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Error placing order", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user orders" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, deliveryTime: req.body.deliveryTime },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status" });
  }
};
