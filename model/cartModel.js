import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const cartSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    products:{
        type:[{
            productId: { type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type:Number , default:  1 },
            total : {type: Number},   
        }],
    },
    cartTotal:{
        type:Number,
        default:0
    }
},
{
    timestamps: true,
  })
const cartModel = mongoose.model('Cart',cartSchema)
export default cartModel