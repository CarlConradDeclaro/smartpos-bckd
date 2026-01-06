import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema(
    {
        // Automatic ID field _id created by MongoDB
        orderDate: { type: Date, default: Date.now },
        status: { type: String, required: true, default: "Pending" }, // Default status is "Pending"
        subtotal: { type: Number, required: true },
        tax: { type: Number, required: true },
        total: { type: Number, required: true },
    }, {timestamps: true});


export default mongoose.model("Order", OrderSchema);
