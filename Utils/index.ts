import express,{type NextFunction , type Request , type Response} from 'express'
import 'dotenv/config'
import {dbconnection} from'../DB/dbConnection.js'
import { authController } from '../Modules/Users/auth.controller.js'
import { stat } from 'fs'


const app=express()
app.use(express.json())

dbconnection()
app.use('/api/auth',authController)

// error handling middleware
app.use((err:Error|null,req:Request,res:Response,next:NextFunction)=>{
    const status=500
    const message='sth went wrong'
    res.status(status).json({message:err?.message || message})
})

const port:number|string=5000
app.listen(port,()=>{
    console.log("server is running on port 3000")
})