import mongoose from "mongoose";


const ProductIngredientSchema = new mongoose.Schema({

    productId: // Ref ID for Product from Product Schema (Many to many)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required."]
        },

    
    rawMatId: // Red ID for Raw Mats from Raw Mats (Many to Many)
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RawMaterials",
            required: [true, "Raw Material ID is required."]
        },

    quantity:
        {
            type: Number,
            required: [true, "Quantity is required."],
            min: [0, "Quantity cannot be less than 0."]
        }

}, {timestamps: true});


const ProductIngredient = mongoose.model("ProductIngredient", ProductIngredientSchema);
export default ProductIngredient;