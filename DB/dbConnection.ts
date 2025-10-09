import mongoose from 'mongoose'
export async function dbconnection(){
    try{
await mongoose.connect(process.env.DB_URL_LOCAL as string )
console.log("database connected")
    }
    catch(error){
        console.log("DB connecton failed",error)
    }
}