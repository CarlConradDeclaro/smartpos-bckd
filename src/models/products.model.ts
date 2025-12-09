import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    unitPrice: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0, // no negative stock
      default: 0,
    },

    status: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
export default Product;
