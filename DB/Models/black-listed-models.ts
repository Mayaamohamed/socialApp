import mongoose
from "mongoose"
import type { IBlackListedTokens } from "../../common/index.js"

 const blackListedTokenSchema = new mongoose.Schema<IBlackListedTokens>({
tokenId:{
    type:String,
    required:true

},expireAt:{
type:Date,
required:true
}
 })
 const BlackListedTokenModel=mongoose.model<IBlackListedTokens>('BlackListedTokens',blackListedTokenSchema)
export{BlackListedTokenModel}