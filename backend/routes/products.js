const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authenticate, requireAdmin } = require("../middleware/auth");

// Add product (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product (Admin only)
router.put("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
