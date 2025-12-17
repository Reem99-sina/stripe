const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  ingredients: [String],
  count: { type: Number, default: 1 },
});

const orderSchema = new Schema({
  products: [productSchema], // ⚡ مصفوفة من المنتجات
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  totalPrice: { type: Number, default: 0 },
  status: { type: String, default: "pending" }, // pending, confirmed, shipped...
  createdAt: { type: Date, default: Date.now },
});
module.exports.Order = mongoose.model("Order", orderSchema);
