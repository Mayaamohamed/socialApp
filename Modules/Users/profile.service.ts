import type mongoose from "mongoose"
import type {  Iuser } from "../../common/index.js"
import type { Request, Response } from 'express'
import { UserRepository } from "../../DB/Repositories/user.repository.js"
import { UserModel } from "../../DB/Models/user.model.js"

export class ProfileService{
    private userRepo:UserRepository=new UserRepository(UserModel)
    updateProfile=async(req:Request,res:Response)=>{
       // const{user}=(req as unknown as IRequest).loggedInUser
        const{firstName,lastName,email,passsword,gender,phoneNumber,DOB}:Iuser=req.body
        const user = await this.userRepo .findDocumentById(req.params._id as unknown as mongoose.Schema.Types.ObjectId)
        if(!user) return res.status(401).json({message:"user not found"})
        if(firstName) user.firstName=firstName
        if(lastName) user.lastName=lastName
        if(email) user.email=email
        if(passsword) user.password=passsword
        if(gender) user.gender=gender
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(DOB) user.DOB=DOB
        await user.save()
        // update by find and update fields and save 
        // there's another way :  update by updateOneDocumnet
        /**
         * await this.userRepo.updateOneDocument(
         * {_id:req.params._id,email},
         * {$set:{firstName,LastName,email,password,gender,phoneNumber,DOB}}
         * {new:true}
         * )
         * res.status(200).json({message:'updated successfuly'})
         */
    }
    getProfile=async(req:Request,res:Response)=>{
        const user=await this.userRepo.findDocumentById(req.params._id as unknown as mongoose.Schema.Types.ObjectId )
        if(!user) return res.status(401).json({message:"user not found"})
            res.status(200).json({message:"success"})
    }

}