import cloudinary from "../middleware/cloudinary.js"
import categoryModel from "../model/categoryModel.js"
import productModel from "../model/productModel.js"
import userModel from "../model/userModel.js"

export const postProduct= async(req,res)=>{
    try{
        const product = req.body.productData
        const image = req.body.imageData
        if(product && image){
            cloudinary.uploader.upload(image).then((result,error)=>{
                    product.images=result.secure_url
                    const newProduct = new productModel(product)
                    newProduct.save().then(async() => {
                     const products = await productModel.find({})
                        res.send({
                            success:true,
                            message:'product added',
                            data:products
                        })
                    })
              
            })
        }
    }catch (err) {
        res.status(500)
    }
}

export const getProduct =async(req,res) =>{
    try{
      const products = await productModel.find()
      if(products){
        res.send({
            success:true,
            message:'products',
            data:products
        })
      }else{
        res.send({
            success:false,
            message:'no products',
        })
      }
      
    }catch (err) {
        res.status(500)
    }
}

export const deleteProduct=async(req,res)=>{
    try{
         await productModel.deleteOne({_id:req.params.id})
         const products = await productModel.find({})
         res.send({
            success:true,
            message:'products',
            data:products
        })
    }catch (err) {
        res.status(500)
    }
}

export const getUsers = async(req,res)=>{
    try{
      const users = await userModel.find({Admin:false})
      if(users){
        res.send({
            success:true,
            message:'Users',
            data:users
        })
      }else{
        res.send({
            success:false,
            message:'Users not found',
        })
      }
    }catch (err) {
        res.status(500)
    }
}

export const statusAdmin = async(req,res)=>{
    try{
     await userModel.findOneAndUpdate({_id:req.params.id},  {$set:{
        isAdmin: true,
        Admin2:false,
        status:'Admin'
    }} )
    const users = await userModel.find({Admin:false})
      if(users){
        res.send({
            success:true,
            message:'Users',
            data:users
        })
      }else{
        res.send({
            success:false,
            message:'Users not found',
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const statusUserAdmin = async(req,res)=>{
    try{
        await userModel.findOneAndUpdate({_id:req.params.id},  {$set:{
            isAdmin: false,
            Admin2:true,
            status:'UserAdmin'
        }} )
        const users = await userModel.find({Admin:false})
      if(users){
        res.send({
            success:true,
            message:'Users',
            data:users
        })
      }else{
        res.send({
            success:false,
            message:'Users not found',
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const statusUser = async(req,res)=>{
    try{
        await userModel.findOneAndUpdate({_id:req.params.id},  {$set:{
            isAdmin: false,
            Admin2:false,
            status:'User'
        }} )
        const users = await userModel.find({Admin:false})
      if(users){
        res.send({
            success:true,
            message:'Users',
            data:users
        })
      }else{
        res.send({
            success:false,
            message:'Users not found',
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const pendingProduct = async(req,res) =>{
    try{
      const products = await productModel.find({status:'Pending'})
      if(products){
        res.send({
            success:true,
            message:'Products',
            data:products
        })
      }else{
        res.send({
            success:false,
            message:'No Products',
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const productApproval = async(req,res)=>{
    try{
      await productModel.findOneAndUpdate({_id:req.params.id},
        {$set:{
            status:'Approved'
        }}
        )
      const products = await productModel.find({status:'Pending'})
      res.send({
        success:true,
        message:'Products',
        data:products
    })
    }catch (err) {    
        res.status(500)  
    }
}

export const postCategory = async(req,res)=>{
    try{
      const category = req.body.category
      const subCategory = []
      const add = {category,subCategory}
      const cate = await categoryModel.findOne({
        category: { $regex: new RegExp(category, 'i') }
      });
      if(cate){
        res.send({
            success:false,
            message:'Category already exsist',
        })
      }else{
        const addCategory = new categoryModel(add)
        addCategory.save()
        const newCategory = await categoryModel.find()
        res.send({
            success:true,
            message:'category',
            data:newCategory
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const getCategory = async(req,res) =>{
    try{
      const category = await categoryModel.find()
      if(category){
        res.send({
            success:true,
            message:'category',
            data:category
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}

export const addSubCategory = async(req,res) =>{
    try{
        const subCategory = req.body.input
        const Id = req.body.value
        if(subCategory.length){
          const exist = await categoryModel.findOne({_id:Id,subCategory: { $in: [subCategory] }})
          if(exist){
            res.send({
                success:false,
                message:'Already exist',
            })
          }else{
            await categoryModel.findOneAndUpdate({_id:Id},
                { $push: { subCategory: subCategory } })
            const newCategory = await categoryModel.find()
            res.send({
                success:true,
                message:'Already exist',
                data:newCategory
            })
          }
        }else{
            res.send({
                success:false,
                message:'No input',
            }) 
        }
    //   const category = await categoryModel.findOneAndUpdate({_id:req.params.id},
    //     {$set:{
    //         subCategory:
    //     }}
    //     )
    }catch (err) {    
        res.status(500)  
    }
}

export const deleteCategory = async(req,res)=>{
    try{
       await categoryModel.deleteOne({_id:req.params.id})
       const category = await categoryModel.find()
       res.send({
        success:true,
        message:'category',
        data:category
    })
    }catch (err) {    
        res.status(500)  
    }
}

export const deleteSubCategory=async(req,res)=>{
    try{
      await categoryModel.findOneAndUpdate({_id:req.body.listId},{ $pull: { subCategory: req.body.sub } })
      const category = await categoryModel.find()
      res.send({
       success:true,
       message:'category',
       data:category
   })
    }catch (err) {    
        res.status(500)  
    }
}

export const getNewCategory = async(req,res) =>{
    try{
      const category = await categoryModel.findOne({category:"T-Shirt"})
      const sub = category.subCategory
      if(sub){
        res.send({
            success:true,
            message:'category',
            data:sub
        })
      }
    }catch (err) {    
        res.status(500)  
    }
}