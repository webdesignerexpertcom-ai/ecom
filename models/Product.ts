import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);

export default Product;
