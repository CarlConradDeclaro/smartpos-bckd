import mongoose from "mongoose";

export const toNumber = (decimal: mongoose.Types.Decimal128) =>
  parseFloat(decimal.toString());
