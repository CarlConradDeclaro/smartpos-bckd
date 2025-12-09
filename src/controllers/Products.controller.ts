import { type Request, type Response } from "express";
import PurchaseOrder from "../models/purchase-order.model";
import Product from "../models/products.model";

export async function getProducts(req: Request, res: Response) {
  try {
    const result = await Product.find();
    res.status(200).json({
      success: "true",
      data: result,
    });
  } catch (err) {
    console.error(`Error getting Purchase Orders: ${err}`);
    res.status(500).json({
      success: "false",
      message: "Internal Server Error.",
    });
  }
}
