const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  image_url:   { type: String },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
