import type { JwtPayload } from "jsonwebtoken";
import type { GenderEnum, otpTypesEnums, ProviderEnum, RoleEnum } from "../Enums/user.enum.js";



export interface IOTP{
value:String;
expireAt:number;
otpType:otpTypesEnums;
}
export interface Iuser extends Document{
    [x: string]: any;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role:RoleEnum;
    gender:GenderEnum;
    DOB?:Date;
    profilePicture?:string;
    coverPicture?:string;
    provider:ProviderEnum;
    googleId?:string;
    phoneNumber?:string;
    isVerified?:boolean;
    OTPS?: IOTP[];


}

 export interface IEmailArgument{
    to:string;
    cc?:string;
    subject:string;
    content:string;
    attachemnt?:[]
}

export interface IRequest extends Request{
    loggedInUser:{user :Iuser,token:JwtPayload}
}
export interface IBlackListedTokens extends Document{
    tokenId:string;
    expireAt:Date
}
