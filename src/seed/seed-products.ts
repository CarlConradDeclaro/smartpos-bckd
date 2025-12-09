// src/seed/seed-products.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/products.model";

dotenv.config();

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not found in .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");

  await Product.deleteMany({});
  console.log("🗑️ Cleared existing products");

  await Product.insertMany([
    {
      name: "Prime Ribeye Steak",
      unitPrice: 45.0,
      quantity: 80, // kg
    },
    {
      name: "Ground Beef (80/20)",
      unitPrice: 12.5,
      quantity: 150, // kg
    },
    {
      name: "Pork Sausages",
      unitPrice: 10.0,
      quantity: 100, // kg
    },
    {
      name: "Chicken Breast (Boneless)",
      unitPrice: 9.75,
      quantity: 200, // kg
    },
    {
      name: "Beef Short Ribs",
      unitPrice: 18.25,
      quantity: 0, // ✅ Out of stock example
    },
  ]);

  console.log("✅ Products seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
