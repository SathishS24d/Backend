import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true,
        enum: ["furniture", "beauty", "fragrance", "groceries"],
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    offer:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const productModel = mongoose.model("shoppyglobe_productSchema",productSchema);

export default productModel;