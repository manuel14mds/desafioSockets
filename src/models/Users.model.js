import mongoose from "mongoose";

const collection = 'users'

const usersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'user'
    },
    age:Number,
    active:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        required:true
    },
    password:{type:String}

},{timestamps:true})

const usersModelService = mongoose.model(collection,usersSchema)
export default usersModelService