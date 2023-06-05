import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const productSchema = new Schema({
    productName:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number,
    },
    discount:{
        type:Number,
    },
    images:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'Pending'
    }
},
{
    timestamps: true,
  })
const productModel = mongoose.model('Product',productSchema)
export default productModel