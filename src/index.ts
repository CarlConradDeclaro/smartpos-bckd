import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db";
import poRouter from "./routes/purchase-order.route";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/product-orders", poRouter);

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
