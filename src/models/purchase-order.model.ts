import mongoose from "mongoose";
import { BSON } from "bson";
// This schema is only for the products array of
// Purchase Order Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required."],
      min: [0, "Quantity cannot be less than 0."],
    },
    // unitPrice: {
    //   type: mongoose.SchemaTypes.Decimal128,
    //   required: [true, "Product price is required."],
    //   min: [0, "Unit Price cannot be less than 0."],
    // },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Product amount is required."],
      min: [0, "Amount cannot be less than 0."],
    },
  },
  { _id: false }
);

// Values subject to change
const purchaseOrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: [true, "Order date is required."],
  },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Delivered"],
      message: "Order status must only be Pending or Delivered.",
    },
    required: [true, "Order status is required."],
  },
  products: {
    type: [productSchema],
    required: [true, "Order Products is required."],
    validate: {
      validator: function (value: (typeof productSchema)[]) {
        return value.length > 0;
      },
      message: "Order Products cannot be empty.",
    },
  },
  subtotal: {
    type: mongoose.SchemaTypes.Decimal128,
    required: [true, "Order subtotal is required."],
    min: [0, "Subtotal cannot be less than 0"],
  },
  tax: {
    type: mongoose.SchemaTypes.Decimal128,
    required: [true, "Order tax is required."],
    min: [0, "Order tax cannot be less than 0"],
  },
  total: {
    type: mongoose.SchemaTypes.Decimal128,
    required: [true, "Order total is required."],
    min: [0, "Order total cannot be less than 0"],
  },
  note: String,
});
purchaseOrderSchema.set("timestamps", true);

// If this line gets highlighted by the LSP, ignore it. It's
// a mongoose/typescript bug when using Decimal128
const PurchaseOrder = mongoose.model("product_orders", purchaseOrderSchema);

export default PurchaseOrder;
