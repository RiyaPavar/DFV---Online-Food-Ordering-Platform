const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// USER ROUTES
router.post("/", protect, placeOrder);
router.get("/:userId", protect, getUserOrders);

// ADMIN ROUTES
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;
