import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({

    orderId: // Ref ID to Order from Order Schema
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: [true, "Order ID is required."]
        },

    productId: // Ref ID to Product from Product Schema
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required."]
        },

    quantity:
        {
            type: Number,
            required: [true, "Quantity is required."],
            min: [0, "Quantity cannot be less than 0."]
        }


}, {timestamps: true});

// Ensure you are exporting the model as the default
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
export default OrderItem;