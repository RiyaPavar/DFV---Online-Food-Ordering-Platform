const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  updateAvailability,
} = require("../controllers/itemController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // 🆕 Add multer

// ✅ Use uplaod(multer) middleware for image upload
router.post("/add", protect, upload.single("image"), addItem);
router.get("/", getAllItems);
router.put("/:id", protect, upload.single("image"), updateItem); // optional: allow image update
router.delete("/:id", protect, deleteItem);
router.patch("/update-availability/:id", protect,updateAvailability);

module.exports = router;
