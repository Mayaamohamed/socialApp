import mongoose
from "mongoose";
import { RoleEnum, GenderEnum, ProviderEnum, otpTypesEnums } from "../../common/Enums/user.enum.js";
import type { Iuser } from "../../common/Interfaces/user.interface.js";
import { generateHash } from "../../Utils/Encryption/hash.utils.js";
import { encrypt } from "../../Utils/Encryption/crypto.utils.js";
/**
 * schema
 * middleware
 * model => once i called model so,schema is compiled/freezed means it doesn't updated
 */

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
 // document middleware->save,validate, init, updateOne,deleteOne
 userSchema.pre('save',async function(next){
//console.log('pre saving user',this)
 //this is doc here 
 console.log(this.isModified("password"))
 if(this.isModified("password")){ // password here is path/field
    // hash 
    this.password=generateHash(this.password as string)
 }
 if(this.isModified(this.phoneNumber)){
    this.phoneNumber=encrypt(this.phoneNumber as string)
 }
next();
})
/**
 * query middelware:
 */
userSchema.pre('findOne',function(){
console.log(this.getQuery())
})

// لية لو حطيته بعد ال model مش هيشتغل
 const UserModel=mongoose.model<Iuser>('User',userSchema)


export{UserModel}