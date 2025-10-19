import type { NextFunction, Request , Response} from "express"
import type { ZodType } from "zod"



type RequestKeyType = keyof Request // عملت type of all keys in request
type SchemaType = Partial<Record<RequestKeyType,ZodType>> // zodtype is the general type of schema
type validationErrorType={ // بحدد شكل الايرور اللي هيجيلي
    Key:RequestKeyType
    issues:{
        path:PropertyKey[]
        message:string
    }[]
}
// schema:zod object of type schemaType
export const validationMiddleware=(schema:SchemaType)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
       const reqKeys:RequestKeyType[]=['body','params','query','headers'] // بخصص ال requestkeys
       const validationErrors:validationErrorType[]=[]

for(const Key of reqKeys){
    if(schema[Key]){
        const result =schema[Key].safeParse(req[Key])
        console.log('the validation is result',{Key , result});
        if(!result?.success){
            const issues=result.error?.issues?.map(issue=>({
                path:issue.path,
                message:issue.message
            }) )
            validationErrors.push({Key, issues})
        }
    }
}
//if(validationErrors.length)  throw // علشان تروح للي بعدها بالايرور
next()
    }
}
// 