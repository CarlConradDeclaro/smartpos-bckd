import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db";
import router from "./routes/purchase-order.route";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

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
