import mongoose from "mongoose";

const collection = 'users'

const usersSchema = mongoose.Schema({
    username:String,
    role:{
        type:String,
        default:'student'
    },
    age:Number,
    active:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

const usersModelService = mongoose.model(collection,usersSchema)
export default usersModelService