import mongoose from "mongoose";

const RawMaterialsSchema = new mongoose.Schema(
    {
        sku: // Primary Key
            {
             type: String, 
             required: [true, "SKU is required."],
             unique: true
            }, 

        name: 
            { 
             type:String,
             required: [true, "Raw Material name is required."]
            },

        category: 
            {
             type:String,
             required: [true, "Category is required."]
            },

        unit: 
            {
              type:String, // Desciption of unit (e.g., kg, liters)
              required: [true, "Unit is required."]
            }, 

        cost: 
            {
             type:Number,
             required: [true, "Material Cost is Required."],
             min: [0, "Cost cannot be less than 0."]
            },

        targetStock: 
            {
             type:Number,
            required: [true, "Target Stock is Required."],
            min: [0, "Target Stock cannot be less than 0."]
        }

    }, {timestamps: true});


const RawMaterials = mongoose.model("RawMaterials", RawMaterialsSchema);
export default RawMaterials;