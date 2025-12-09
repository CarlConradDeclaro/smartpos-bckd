import mongoose from "mongoose";

const poProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPriceSnapshot: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    total: { type: mongoose.SchemaTypes.Decimal128, required: true }, // quantity * unitPrice
  },
  { _id: false }
);

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: { type: String, required: true, unique: true },
    supplierName: { type: String, required: true },
    orderDate: { type: Date, required: true },
    scheduledDelivery: { type: Date, required: false },
    products: [poProductSchema],
    subtotal: { type: mongoose.SchemaTypes.Decimal128, required: true },
    taxes: { type: mongoose.SchemaTypes.Decimal128, required: false },
    deliveryFee: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    totalCost: { type: mongoose.SchemaTypes.Decimal128, required: true },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveredAt: { type: Date }, // timestamp when delivered
    notes: { type: String },
  },
  { timestamps: true }
);

const PurchaseOrder = mongoose.model("purchase_orders", purchaseOrderSchema);

export default PurchaseOrder;
