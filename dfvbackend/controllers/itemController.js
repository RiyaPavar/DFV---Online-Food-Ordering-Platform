const Item = require("../models/Item");
const { cloudinary } = require("../utils/cloudinary");

// ✅ Add Item
exports.addItem = async (req, res) => {
  try {
    const { name, price, description, category, subcategory, availability } = req.body;

    if (!name || !price || !description || !category || !subcategory) {
      return res.status(400).json({ error: "All fields except image are required" });
    }

    const newItem = new Item({
      name,
      price,
      description,
      category,
      subcategory,
      availability: availability === "true" || availability === true,
      img: req.file?.path || "",
      cloudinary_id: req.file?.filename || "",
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Add item error:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

// ✅ Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Get all items error:", error);
    res.status(500).json({ error: "Error fetching items" });
  }
};

// ✅ Update Item
exports.updateItem = async (req, res) => {
  try {
    const { name, price, description, category, subcategory, availability } = req.body;

    const updatedData = {
      name,
      price,
      description,
      category,
      subcategory,
      availability: availability === "true" || availability === true,
    };

    if (req.file) {
      const existingItem = await Item.findById(req.params.id);
      if (!existingItem) return res.status(404).json({ error: "Item not found" });

      if (existingItem.cloudinary_id) {
        await cloudinary.uploader.destroy(existingItem.cloudinary_id);
      }

      updatedData.img = req.file.path;
      updatedData.cloudinary_id = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Update item error:", error);
    res.status(400).json({ error: "Failed to update item" });
  }
};

// ✅ Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (item.cloudinary_id) {
      await cloudinary.uploader.destroy(item.cloudinary_id);
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item and image deleted" });
  } catch (error) {
    console.error("Delete item error:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

// ✅ Update Availability Only
exports.updateAvailability = async (req, res) => {
  try {
    let { availability } = req.body;

    if (typeof availability === "string") {
      availability = availability === "true";
    }

    if (typeof availability !== "boolean") {
      return res.status(400).json({ error: "Invalid availability value" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Availability updated", item: updatedItem });
  } catch (error) {
    console.error("Update availability error:", error);
    res.status(500).json({ error: "Failed to update availability" });
  }
};
