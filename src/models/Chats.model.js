import mongoose from "mongoose";

const collection = 'chats'

const chatsSchema = mongoose.Schema({
    message:String,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    }
},{timestamps:true})

const chatsModelService = mongoose.model(collection,chatsSchema)
export default chatsModelService