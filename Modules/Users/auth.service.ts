import type { NextFunction,Request,Response } from "express";
import { otpTypesEnums, type IRequest, type Iuser } from "../../common/index.js";
import { UserRepository } from "../../DB/Repositories/user.repository.js";
import { UserModel } from "../../DB/Models/user.model.js";
import { encrypt } from "../../Utils/Encryption/crypto.utils.js";
import { comapreHash, generateHash } from "../../Utils/Encryption/hash.utils.js";
import { emitter } from "../../Utils/Services/email.utils.js";
import { generateToken } from "../../Utils/Encryption/token.utils.js";
import { BlackListedTokenRepository } from "../../DB/Repositories/black-listed-token.repository.js";
import { BlackListedTokenModel } from "../../DB/Models/black-listed-models.js";

class AuthService{
private userRepo:UserRepository=new UserRepository(UserModel)
private blackListedRepo:BlackListedTokenRepository=new BlackListedTokenRepository(BlackListedTokenModel)
    signUp= async (req:Request,res:Response,next:NextFunction)=>{
        const{firstName,lastName,email,password,gender,phoneNumber,DOB}: Partial<Iuser>=req.body
        // هو مش هيبعت كل الحاجات اللي فيه iuser 
        // علشان كدا كتبت partial
const isEmailExists=await this.userRepo.findOneDocument({email},'email')
if (isEmailExists) return res.status(409).json({message:'Email already exisits',data:{invalidEmail:email}})
// encrypt phoneNumber
const encryptedNumber=encrypt(phoneNumber as string)
// hash password
const hashedPassword=generateHash(password as string)
//send otp
const otp=Math.floor(Math.random()*1000000).toString()
emitter.emit('SendEmail',{
    to:email,
    subject:'OTP FOR SIGN_UP',
    content:`your otp is ${otp}`
})
const confirmationOtp={
    value:generateHash(otp),
    expireAt:Date.now()+60000,
    otpType:otpTypesEnums.CONFIRMATION
}
    const newUser=await this.userRepo.createNewDocoumnt({
       firstName,lastName,email,password:hashedPassword,gender,phoneNumber:encryptedNumber,DOB,OTPS:[confirmationOtp]
    })
    return res.status(201).json({message:'User created successfully',data:{newUser}})

    }

    SignIn=async(req:Request,res:Response)=>{
        const {email,password}=req.body
        // check if email and password is found
const user=await this.userRepo.findOneDocument({email})
if(!user){ return res.status(404).json({message:'user not found'})}
// check if password equals to hashed passsword
const comparedPassword=comapreHash (password,user.password)
if(!comparedPassword) {return res.status(401).json({message:'email or password is not correct'})}
// generate token(signin)
  const token = generateToken(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    {expiresIn:'1h'}
);
         return res.status(200).json({
    message: "Signed in successfully",
    data: { token },
  });
  const refreshToken = generateToken(
  { id: user._id, email: user.email },
  process.env.REFRESH_SECRET as string,
  { expiresIn: "7d" }
);
    }

    confirmMail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // نجيب اليوزر اللي لسه مش متأكد
  const user = await this.userRepo.findOneDocument({ email, isVerified: false });
  if (!user) {
    return res.status(400).json({ message: "User not found or already verified" });
  }

  // نلاقي OTP من نوع "CONFIRMATION"
  const confirmationOtp = user.OTPS?.find(
    (o: any) => o.otpType === "CONFIRMATION"
  );

  if (!confirmationOtp) {
    return res.status(404).json({ message: "No confirmation OTP found" });
  }

  // نتحقق إن OTP لسه صالحة
  if (confirmationOtp.expireAt < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // نتحقق إن القيمة صحيحة
  const isMatched = comapreHash(otp.toString(), confirmationOtp.value.toString());
  if (!isMatched) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  // نحدث حالة اليوزر
  user.isVerified = true;

  // نحذف الـ OTP بعد التأكيد
  user.OTPS = user.OTPS.filter(
    (o: any) => o.otpType !== "CONFIRMATION"
  );

  await user.save();

  return res.status(200).json({ message: "Email confirmed successfully" });
};

logout=async (req:Request,res:Response)=>{
  const{token:{jti,exp}}=(req as unknown as IRequest).loggedInUser
  const blackListedToken=await this.blackListedRepo.createNewDocoumnt({tokenId:jti,expireAt:new Date(exp || Date.now()+600000)})
  res.status(200).json({message:"user logged out successfully",data:{blackListedToken}})
}
}
export default new AuthService()