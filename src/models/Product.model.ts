import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({

    // ID automatically created by MongoDB as _id

    name:
        {
            type: String,
            required: [true, "Product name is required"]
        },
    
    unitPrice:
        {
            type: Number,
            required: [true, "Unit Price is required"],
            min: [0, "Unit Price cannot be less than 0."]
        },

    quantity: 
        {
            type: Number,
            required: [true, "Product quantity is required"],
            min: [0, "Quantity cannot be less than 0."]
        },

    status:
        {
            type: String,
            enum: {
                values: ["In Stock", "Low"], // Default In Stock
                default: "In Stock"
            }
        }


}, {timestamps: true});


const Product = mongoose.model("Product", ProductSchema);
export default Product;