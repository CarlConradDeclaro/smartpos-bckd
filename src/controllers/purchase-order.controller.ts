import type { Request, Response } from "express";
import PurchaseOrder from "../models/purchase-order.model";
import mongoose from "mongoose";

export async function getAllPO(_req: Request, res: Response) {
  try {
    const result = await PurchaseOrder.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(`Error getting Purchase Orders: ${err}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
}

export async function createPO(req: Request, res: Response) {
  try {
    const result = await PurchaseOrder.create(req.body);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const requiredFieldErrors: String[] = [];
      const fieldValidationErrors: String[] = [];

      Object.keys(err.errors).forEach((key) => {
        const fieldError = err.errors[key];
        
        if (fieldError?.kind === "required") {
          requiredFieldErrors.push(fieldError.message)
        } else {
          fieldValidationErrors.push(fieldError!.message);
        }
      });

      if (requiredFieldErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields.",
          errors: requiredFieldErrors
        })
      }

      if (fieldValidationErrors.length > 0) {
        return res.status(422).json({
          success: false,
          message: "Field Validation failed",
          errors: fieldValidationErrors
        })
      }
    }
    
    console.error(`Error saving Purchase Order: ${err}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
}
