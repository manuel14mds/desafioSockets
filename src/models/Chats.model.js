import mongoose from "mongoose";

const collection = 'chats'

const chatsSchema = mongoose.Schema({
    message:String,
    username:String
},{timestamps:true})

const chatsModelService = mongoose.model(collection,chatsSchema)
export default chatsModelService