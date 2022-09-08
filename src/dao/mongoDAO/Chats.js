import chatModelService from '../../models/Chats.model.js'
import MongoContainer from "./MongoContainer.js";
export default class Chats extends MongoContainer{
    constructor(){
        super()
        this.modelService = chatModelService
    }
    getAllPopulated= async()=>{
        let data =  await this.modelService.find().populate('user')
        return data
    }
}