const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String, // Using URL instead of file upload
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
