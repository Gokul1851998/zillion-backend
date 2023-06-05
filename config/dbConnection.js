import mongoose from "mongoose";

const connection = ()=>{
    mongoose.connect('mongodb+srv://Gokul:1234@cluster0.4bu5rrc.mongodb.net/zillion?retryWrites=true&w=majority')
    console.log('connected');
}

export default connection