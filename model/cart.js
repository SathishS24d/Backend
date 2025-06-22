import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    //foreign key from product collection
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "shoppyglobe_productSchema",
        required: true
    },
    email:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    brand:{
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true,
        enum: ["furniture", "beauty", "fragrance", "groceries"],
    },
    qty: {
        type: Number,
        required: true
    },
    price:{
        type:String,
        required:true
    }

})
const cartModel = mongoose.model("shoppyglobe_cartSchema",cartSchema);
export default cartModel;

