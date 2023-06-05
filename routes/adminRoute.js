import  express  from "express";
import { addSubCategory, deleteCategory, deleteProduct, deleteSubCategory, getCategory, getNewCategory, getProduct, getUsers, pendingProduct, postCategory, postProduct, productApproval, statusAdmin, statusUser, statusUserAdmin } from "../controllers/adminController.js";

const router = express.Router()

router.post('/post-product',postProduct)
router.get('/get-product',getProduct)
router.get('/delete-product/:id',deleteProduct)
router.get('/get-users',getUsers)
router.get('/status-admin/:id',statusAdmin)
router.get('/status-userAdmin/:id',statusUserAdmin)
router.get('/status-user/:id',statusUser)
router.get('/product-approval/:id',productApproval)
router.get('/pending-products',pendingProduct)
router.post('/post-category',postCategory)
router.get('/get-category',getCategory)
router.post('/get-subCategory',addSubCategory)
router.get('/delete-category/:id',deleteCategory)
router.post('/delete-subCategory',deleteSubCategory)
router.get('/get-newcategory',getNewCategory)
export default router