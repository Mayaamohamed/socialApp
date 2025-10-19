// class authentication middleware
// includes auhentication + authorization 

import type { NextFunction,Response,Request } from "express";
import type { Iuser,IRequest } from "../common/index.js";
import { verifyToken } from "../Utils/Encryption/token.utils.js";
import { UserModel } from "../DB/Models/user.model.js";
import { UserRepository } from "../DB/Repositories/user.repository.js";
import type { JwtPayload } from "jsonwebtoken";
import { BlackListedTokenRepository } from "../DB/Repositories/black-listed-token.repository.js";
import { BlackListedTokenModel } from "../DB/Models/black-listed-models.js";
const userRepo = new UserRepository(UserModel)
const blackListedRepo=new BlackListedTokenRepository(BlackListedTokenModel)

export const authentication= async(req:Request,res:Response,next:NextFunction)=>{
    const accessToken = req.headers['authorization'];
    if(!accessToken || typeof accessToken !== 'string') return res.status(401).json({message:'plz login first'})
    const [prefix,token]=accessToken.split(' ')
if(prefix !== 'Bearer') return res.status(402).json({message:'invalid token'})
    const decodedData=verifyToken (token , process.env.JWT_ACCESS_SECRET as string)
if(!decodedData._id) return res.status(401).json({message:'in valid payload'})

    const blackListedToken= await blackListedRepo.findOneDocument({tokenId:decodedData.jti})
    if(blackListedToken) return res.status(401).json({message:"your session is ended"})



    const user:Iuser| null=await userRepo.findDocumentById(decodedData._id,'-password')
    // fund doc witout password
    if(!user) return res.status(404).json({message:'plz register first'});
(req as unknown as IRequest).loggedInUser={user,token:decodedData as JwtPayload} // loggedinuser : type not found so, we need to add it
next()
}


