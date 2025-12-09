import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/products.model";
import PurchaseOrder from "../models/purchase-order.model";

dotenv.config();

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not set in your .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing POs
    await PurchaseOrder.deleteMany({});
    console.log("🗑️ Cleared existing purchase orders");

    // Fetch products from DB
    const products = await Product.find({});
    if (products.length === 0) {
      console.error("❌ No products found. Seed products first.");
      process.exit(1);
    }

    // Helper to convert Decimal128 to number
    const toNumber = (decimal: mongoose.Types.Decimal128) =>
      parseFloat(decimal.toString());

    // Tax rate and delivery fee
    const TAX_RATE = 0.08;
    const DELIVERY_FEE = 25;

    // Example PO data
    const poData = [
      {
        poNumber: "#PO-00754",
        supplierName: "Metro Meats Inc.",
        orderDate: new Date("2024-08-27T00:00:00Z"),
        scheduledDelivery: new Date("2024-08-28T00:00:00Z"),
        status: "Delivered",
        deliveredAt: new Date("2024-08-28T10:30:00Z"),
        products: [
          {
            product: products[0]._id,
            productName: "Prime Ribeye Steak",
            quantity: 10,
            unitPriceSnapshot: products[0].unitPrice,
            total: mongoose.Types.Decimal128.fromString(
              (toNumber(products[0].unitPrice) * 10).toString()
            ),
          },
          {
            product: products[1]._id,
            productName: "Ground Beef (80/20)",
            quantity: 25,
            unitPriceSnapshot: products[1].unitPrice,
            total: mongoose.Types.Decimal128.fromString(
              (toNumber(products[1].unitPrice) * 25).toString()
            ),
          },
          {
            product: products[2]._id,
            productName: "Pork Sausages",
            quantity: 15,
            unitPriceSnapshot: products[2].unitPrice,
            total: mongoose.Types.Decimal128.fromString(
              (toNumber(products[2].unitPrice) * 15).toString()
            ),
          },
          {
            product: products[3]._id,
            productName: "Chicken Breast (Boneless)",
            quantity: 30,
            unitPriceSnapshot: products[3].unitPrice,
            total: mongoose.Types.Decimal128.fromString(
              (toNumber(products[3].unitPrice) * 30).toString()
            ),
          },
        ],
        subtotal: mongoose.Types.Decimal128.fromString(
          (
            toNumber(products[0].unitPrice) * 10 +
            toNumber(products[1].unitPrice) * 25 +
            toNumber(products[2].unitPrice) * 15 +
            toNumber(products[3].unitPrice) * 30
          ).toString()
        ),
        taxes: mongoose.Types.Decimal128.fromString(
          (
            (toNumber(products[0].unitPrice) * 10 +
              toNumber(products[1].unitPrice) * 25 +
              toNumber(products[2].unitPrice) * 15 +
              toNumber(products[3].unitPrice) * 30) *
            TAX_RATE
          ).toFixed(2)
        ),
        deliveryFee: mongoose.Types.Decimal128.fromString(
          DELIVERY_FEE.toString()
        ),
        totalCost: mongoose.Types.Decimal128.fromString(
          (
            toNumber(products[0].unitPrice) * 10 +
            toNumber(products[1].unitPrice) * 25 +
            toNumber(products[2].unitPrice) * 15 +
            toNumber(products[3].unitPrice) * 30 +
            (toNumber(products[0].unitPrice) * 10 +
              toNumber(products[1].unitPrice) * 25 +
              toNumber(products[2].unitPrice) * 15 +
              toNumber(products[3].unitPrice) * 30) *
              TAX_RATE +
            DELIVERY_FEE
          ).toFixed(2)
        ),
        notes:
          "Please ensure all steaks are at least 1.5 inches thick. Chicken breasts to be packed in 5kg bags.",
      },
    ];

    // Insert POs
    await PurchaseOrder.insertMany(poData);

    console.log("✅ Purchase Orders seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding purchase orders:", error);
    process.exit(1);
  }
}

seed();
