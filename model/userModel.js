import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const userSchema = new Schema({
    signName:{
        type:String
    },
    signEmail:{
        type:String
    },
    signPassword:{
        type:String
    },
    block:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
     Admin:{
        type:Boolean,
        default:false
    },
    Admin2:{
        type:Boolean,
        default:false
    },
    status:{
       type:String,
       default:'User'
    }
},
{
    timestamps: true,
  })
const userModel = mongoose.model('User',userSchema)
export default userModel