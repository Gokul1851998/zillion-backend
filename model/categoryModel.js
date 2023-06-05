import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const categorySchema = new Schema({
    category:{
        type:String
    },
    subCategory:{
        type:Array
    },
},
{
    timestamps: true,
  })
const categoryModel = mongoose.model('Category',categorySchema)
export default categoryModel