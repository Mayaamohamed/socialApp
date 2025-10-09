import mongoose
from "mongoose";
import { RoleEnum, GenderEnum, ProviderEnum, otpTypesEnums } from "../../common/Enums/user.enum.js";
import type { Iuser } from "../../common/Interfaces/user.interface.js";
 

 const userSchema = new mongoose.Schema<Iuser>({
    firstName:{
        type:String,
        required:true,
        minLenght:[4,"firstName must be atleast 4 chars"]
    },
lastName:{
       type:String,
        required:true,
        minLenght:[4,"firstName must be atleast 4 chars"]
},
password:{
         type:String,
        required:true,
},
role:{
    type:String,
     enum: RoleEnum,
    default:RoleEnum.ADMIN
},
gender:{
       type:String,
    enum:GenderEnum,
    default:GenderEnum.FEMALE
},
DOB:Date,
profilePicture:String,
coverPicture:String,
provider:{
    type:String,
    enum:ProviderEnum,
    default:ProviderEnum.LOCAL
},
googleId:String,
isVerified:{
    type:Boolean,
    default:false
},
phoneNumber:String,
email:{
   type:String,
   required:true,
   index:{
    unique:true,
    name:'idx_email_unique'
   } ,
   OTPS:[{
    value:{type:String,required:true},
    expireAt:{type:Date,default:Date.now()+60000},
    otpType:{type:String,enum:otpTypesEnums,required:true}
   }]
}
 })
 const UserModel=mongoose.model<Iuser>('User',userSchema)
export{UserModel}