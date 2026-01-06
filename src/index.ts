import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db";
import poRouter from "./routes/purchase-order.route";
import productRouter from "./routes/product.route";
import orderRouter from "./routes/order.route";
import rawMaterialRouter from "./routes/rawmaterial.route";
import orderItemRouter from "./routes/orderitem.route";
import productIngredientRouter from "./routes/product-ingredient.route";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/product-orders", poRouter);

// Added routes for products, orders, raw materials, and order items
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/raw-materials", rawMaterialRouter);
app.use("/api/order-items", orderItemRouter);
app.use("/api/product-ingredients", productIngredientRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  try {
    await dbConnect();
  } catch (err) {
    console.error(`Database failed to connect: ${err}`);
  }
  console.log(`Server is running on port ${PORT}`);
});
