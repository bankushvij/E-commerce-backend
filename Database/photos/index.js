import mongoose from "mongoose";

const photosSchema=new mongoose.Schema(
    {
        images:[{location:{type:String}}],
    }
)

export const photosModel= mongoose.models["photos"]||mongoose.model("photos",photosSchema)