import type { Model } from "mongoose";
import type { IBlackListedTokens } from "../../common/index.js";
import { BaseRepository } from "./base.repository.js";


export class BlackListedTokenRepository extends BaseRepository<IBlackListedTokens>{
    constructor(protected _blackListedTokenModel:Model<IBlackListedTokens>){
        super(_blackListedTokenModel)
    }}
