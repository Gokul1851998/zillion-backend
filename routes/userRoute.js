import  express  from "express";
import { addToChart, getChart, getUserProduct, userLogin, userSignin } from "../controllers/userController.js";
const router = express.Router()

router.post('/user-signIn',userSignin)
router.post('/user-login',userLogin)
router.post('/post-cart',addToChart)
router.get('/user-product',getUserProduct)
router.post('/get-cart',getChart)


export default router