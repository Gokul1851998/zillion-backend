import { generateToken } from "../jwtAuth/generateJwt.js";
import cartModel from "../model/cartModel.js";
import productModel from "../model/productModel.js";
import userModel from "../model/userModel.js";
import bcrypt,{hash} from 'bcrypt'

export const userSignin = async(req,res)=>{
    try{
        let {signName,signEmail,signPassword} = req.body
        const user = await userModel.findOne({signEmail:signEmail})
        if(user){
            res.send({
                success:false,
                message:'Account already exist',
            })
        }else{
            bcrypt.hash(signPassword, 10).then((hash) => {
                    signPassword = hash
                    const newUser = new userModel({signName,signEmail,signPassword})
                    newUser.save().then(() => {
                        res.send({
                            success:true,
                            message:'Sign in successfully',
                        })
                    })
                })
        }
    }catch (err) {
        res.status(500)
    }
}

export const userLogin=async(req,res)=>{
    try{
       const {loginEmail,loginPassword} = req.body
       const user = await userModel.findOne({signEmail:loginEmail})
       if(user.isAdmin === false && user.Admin2 === false){
        if (!user.block) {
            bcrypt.compare(loginPassword, user.signPassword, function (err, result) {
                if (result) {
                    const token = generateToken({ userId: user._id, name: user.signName, type: 'user' })
                    res.send({
                        success:true,
                        message:'Login successfull',
                        data:{token,user}
                    })
                } else {
                    res.send({
                        success:false,
                        message:'Wrong password',
                    })
                }
            })
        } else {
            res.send({
                success:false,
                message:'Your account as been blocked',
            })
        }
       }else if(user.isAdmin && user.Admin === false){
        bcrypt.compare(loginPassword, user.signPassword, function (err, result) {
            if (result) {
                const admintoken = generateToken({ userId: user._id, name: user.signName, type: 'user' })
                res.send({
                    success:true,
                    message:'Login successfull',
                    data:{admintoken,user}
                })
            } else {
                res.send({
                    success:false,
                    message:'Wrong password',
                })
            }
        })
       }else if(user.Admin === true){
        bcrypt.compare(loginPassword, user.signPassword, function (err, result) {
            if (result) {
                const Superadmintoken = generateToken({ userId: user._id, name: user.signName, type: 'user' })
                res.send({
                    success:true,
                    message:'Login successfull',
                    data:{Superadmintoken,user}
                })
            } else {
                res.send({
                    success:false,
                    message:'Wrong password',
                })
            }
        })
       }else if(user.Admin2 === true){
        bcrypt.compare(loginPassword, user.signPassword, function (err, result) {
            if (result) {
                const Admin2 = generateToken({ userId: user._id, name: user.signName, type: 'user' })
                res.send({
                    success:true,
                    message:'Login successfull',
                    data:{Admin2,user}
                })
            } else {
                res.send({
                    success:false,
                    message:'Wrong password',
                })
            }
        })
       }else{
        res.send({
            success:false,
            message:'Something went wrong',
        })
       }
    }catch (err) {
        res.status(500)
    }
}

export const addToChart = async(req,res) =>{
    try{
       const product = await productModel.findOne({_id:req.body.productId})
       const productId = req.body.productId
       const total = product.price
       const user = await userModel.findOne({signName:req.body.user})
       const userId = user._id
       const existCart = await cartModel.findOne({userId:user._id})
       if(existCart){
        console.log('here');
        const productExist = await cartModel.findOne({
            userId,
            "products.productId": productId,
          });

          if(productExist){
            await cartModel
            .findOneAndUpdate(
              { userId, "products.productId": productId },
              {
                $inc: {
                  "products.$.quantity": 1,
                  "products.$.total": total,
                  cartTotal: total,
                },
              }
            )
            .then(() => {
                res.send({
                    success:true,
                    message:'add to cart',
                })
            });
          }else{
            await cartModel
            .findOneAndUpdate(
              { userId: userId },
              {
                $push: { products: { productId, total } },
                $inc: { cartTotal: total },
              }
            )
            .then(() => {
                res.send({
                    success:true,
                    message:'add to cart +',
                })
            });
          }
       }else{
        console.log('here2');
        const cartProduct = new cartModel({
            userId,
            products: [{ productId, total }],
            cartTotal: total,
          });
          await cartProduct
            .save()
            .then(() => {
                res.send({
                    success:true,
                    message:'add to cart successfully',
                })
            })
            .catch((err) => {
              console.log(err.message);
              res.json({ status: false });
            });
       }

    }catch (err) {
        res.status(500)
    }
}

export const getUserProduct =  async(req,res)=>{
    try{
       const product = await productModel.find({status:'Approved'})
       res.send({
        success:true,
        message:'Products',
        data:product
    })
    }catch (err) {
        res.status(500)
    }
}

export const getChart = async(req,res) =>{
    try{
     const user = await userModel.findOne({signName:req.body.userName})
     if(user){
        const userCart = await cartModel.findOne({userId:user._id}).populate("products.productId");
        res.send({
            success:true,
            message:'Cart',
            data:userCart
        })
     }
    }catch (err) {
        res.status(500)
    }
}