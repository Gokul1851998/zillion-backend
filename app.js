import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connection from './config/dbConnection.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(bodyParser.json({limit:"50mb"}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))
app.use(logger('dev'))
connection()
app.use(cors({ 
    origin:'*',
    method:['POST', 'GET', 'PUT', 'DELETE','PATCH'],
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Access',
        'Authorization'
    ]
}))

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(4000,()=>{
    console.log('Server connected on port 4000');
})