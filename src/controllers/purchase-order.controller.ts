import { type Request, type Response } from "express";
import PurchaseOrder from "../models/purchase-order.model";
import { toNumber } from "../utils/helper/toNumber";
import Product from "../models/products.model";
import mongoose from "mongoose";

//GET
export async function getAllPO(req: Request, res: Response) {
  try {
    const result = await PurchaseOrder.find();
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

export async function getPO(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid purchase order ID",
      });
    }
    const result = await PurchaseOrder.findById(id).populate(
      "products.product"
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order not found",
      });
    }

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

// Tax rate and default delivery fee
const TAX_RATE = 0.08;
const DEFAULT_DELIVERY_FEE = 25;

// Helper to generate PO Number
function generatePONumber(): string {
  const timestamp = Date.now().toString().slice(-6); // last 6 digits of timestamp
  return `#PO-${timestamp}`;
}

export async function createPO(req: Request, res: Response) {
  try {
    const {
      supplierName,
      products: reqProducts,
      status = "Pending",
      deliveryFee = DEFAULT_DELIVERY_FEE,
      notes,
    } = req.body;

    if (!supplierName) {
      return res.status(400).json({
        success: "false",
        message: "Supplier name is required",
      });
    }

    if (
      !reqProducts ||
      !Array.isArray(reqProducts) ||
      reqProducts.length === 0
    ) {
      return res.status(400).json({
        success: "false",
        message: "Products array is required",
      });
    }

    let subtotal = 0;

    // Prepare products array for PO
    const poProducts = await Promise.all(
      reqProducts.map(async (p: { product: string; quantity: number }) => {
        const product = await Product.findById(p.product);
        if (!product) throw new Error(`Product not found: ${p.product}`);

        const unitPrice = toNumber(product.unitPrice);
        const total = unitPrice * p.quantity;
        subtotal += total;

        return {
          product: product._id,
          productName: product.name,
          quantity: p.quantity,
          unitPriceSnapshot: product.unitPrice,
          total: mongoose.Types.Decimal128.fromString(total.toString()),
        };
      })
    );

    const taxes = subtotal * TAX_RATE;
    const totalCost = subtotal + taxes + deliveryFee;

    // Create PO
    const newPO = await PurchaseOrder.create({
      poNumber: generatePONumber(),
      supplierName,
      orderDate: new Date(),
      scheduledDelivery: null,
      status,
      deliveredAt: status === "Delivered" ? new Date() : undefined,
      products: poProducts,
      subtotal: mongoose.Types.Decimal128.fromString(subtotal.toString()),
      taxes: mongoose.Types.Decimal128.fromString(taxes.toFixed(2)),
      deliveryFee: mongoose.Types.Decimal128.fromString(deliveryFee.toString()),
      totalCost: mongoose.Types.Decimal128.fromString(totalCost.toFixed(2)),
      notes: notes || "",
    });

    res.status(201).json({
      success: "true",
      data: newPO,
    });
  } catch (err: any) {
    console.error(`Error creating Purchase Order: ${err}`);
    res.status(500).json({
      success: "false",
      message: err.message || "Internal Server Error",
    });
  }
}
