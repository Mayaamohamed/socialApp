import { hashSync } from "bcrypt"

// generate hash
export const generateHash =(plainText:string,saltRounds:number=parseInt(process.env.SALT_ROUNDS as string)):string=>{
   return hashSync(plainText,saltRounds) 
}

// compare 2 hashs
export const comapreHash=(plainText:string,hash:string):boolean=>{
    return comapreHash(plainText,hash)
}