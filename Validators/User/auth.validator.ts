import z from 'zod'
import { GenderEnum } from '../../common/index.js'

export const signUpValidator={
    body:z.object({
        firstName:z.string().min(3).max(10),
        lastName:z.string().min(3).max(10),
        email:z.email(),
        password:z.string(),
        passwordConfirmation:z.string(),
        gender:z.enum(GenderEnum),
        DOB:z.date(),
        phoneNumber:z.string().min(11).max(11)
    })
    .refine((data)=>{ // takes 1 custom vaidation rule 
        if(data.password !== data.passwordConfirmation) return false
        return 
    }, // it better to use super refine
    //if it returns false
    {path:['passwordConfirmation'],message:'passwords dont match'}
)
}
// strict object => لو دخلي اي حاجة غير اللي موجود يعتبره error
