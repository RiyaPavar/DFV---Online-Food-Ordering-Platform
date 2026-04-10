const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { // 🔄 Renamed from 'desc' to match controller
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Starter', 'Main Course', 'Dessert', 'Drinks']
  },
  subcategory: {
    type: String,
    required: true,
    enum: [
      'Pizza', 'Burger', 'North Indian', 'Chinese', 'Biryani', 'Rolls',
      'Dosa', 'Chole Bhature', 'Kebab', 'Ice Cream', 'Cake', 'Paratha', 'Pure Veg'
    ]
  },
  img: {
    type: String, // Cloudinary image URL
    default: "",
  },
  cloudinary_id: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);
