// class authentication middleware
// includes auhentication + authorization 

import type { NextFunction,Response,Request } from "express";
import type { Iuser } from "../common/index.js";
import { verifyToken } from "../Utils/Encryption/token.utils.js";
import { UserModel } from "../DB/Models/user.model.js";
import { UserRepository } from "../DB/Repositories/user.repository.js";
const userRepo = new UserRepository(UserModel)
export const authentication= async(req:Request,res:Response,next:NextFunction)=>{
    const {authorization:accessToken}=req.headers
    if(!accessToken) return res.status(401).json({message:'plz login first'})
    const [prefix,token]=accessToken.split(' ')
if(prefix !== 'Bearer') return res.status(402).json({message:'invalid token'})
    const decodedData=verifyToken (token , process.env.JWT_ACCESS_SECRET as string)
if(!decodedData._id) return res.status(401).json({message:'in valid payload'})

    const user:Iuser| null=await userRepo.findDocumentById(decodedData._id,'-password')
    if(!user) return res.status(404).json({message:'plz register first'})
req.loggedInUser={user,token:decodedData}
next()
}


