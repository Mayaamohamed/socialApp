// abstract class
// core methods 
// مش هينقع اخد instance
// اقدر extend
import mongoose, { Model, mongo, type FilterQuery, type ProjectionType, type QueryOptions, type UpdateQuery } from "mongoose";

export abstract class BaseRepository<T>{

    constructor (protected model:Model<T>){}

   async createNewDocoumnt(document:Partial<T>):Promise<T>{
        return  await this .model.create(document)
    }
    async findOneDocument(filters:FilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>):Promise<T|null>{
        return  await this.model.findOne(filters,projection,options)
        // اي find ممكن ترجعي يا promise يا null فلازم اقوله
    }
     async findDocumentById(id:mongoose.Schema.Types.ObjectId,projection?:ProjectionType<T>,options?:QueryOptions<T>):Promise<T|null>{
        return  await this.model.findById(id,projection,options)
    }
   async updateOneDocument(filters:FilterQuery<T>,updateObject:UpdateQuery<T>,options?:QueryOptions<T>){
        return await this.model.findOneAndUpdate()
    }
    updateMultipleDocuments(){}
    deleteOneDocument(){}
    deleteMultipleDocument(){}
    findAndUpdateDocument(){}
    findAndDeleteDocument(){}
   async findDocuments(filters:FilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>):Promise<T[]|null>{
    return await this.model.find(filters,projection,options)
    } // find return array 


}