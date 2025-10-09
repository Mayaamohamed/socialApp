import type { Iuser } from "../../common/Interfaces/user.interface.js";
import { UserModel } from "../Models/user.model.js";
import { BaseRepository } from "./base.repository.js";
import { Model } from "mongoose";

export class UserRepository extends BaseRepository<Iuser>{
    constructor(protected model:Model<Iuser>){
        super(model)
    }
    // findUserByEmail
    
}