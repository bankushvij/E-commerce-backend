import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemType: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: {
            size_L: { type: Number },
            size_XL: { type: Number },
            size_XXL: { type: Number },
        },
        sizes: [{ type: String }],
        gender:{type:String,required:true},
        colour:[{type:String}],
        photos: { type: mongoose.Types.ObjectId, ref: "photos" },
        description:{type:String},

    }
)

export const itemsModel= mongoose.models["items"]||mongoose.model("items",itemSchema)