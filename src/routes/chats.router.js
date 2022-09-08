import {  Router } from "express"
import services from '../dao/index.js'
import mongoose from 'mongoose'
import {normalize, schema} from 'normalizr'

const router = Router()

router.get('/', async(req,res)=>{
    let data = await services.ChatService.getAllPopulated()
    
    const user = new schema.Entity('users')
    const message = new schema.Entity('messages',{
        user:user
    })
    const chat = new schema.Entity('chats',{
        message:[message]
    })
    const normalizerData = normalize(data, chat)

    console.log(JSON.stringify(normalizerData, null, '\t'))
    res.send(normalizerData)
})





router.delete('/', async(req,res)=>{
    await services.ChatService.deleteAll()
    res.send('chats deleted successfully')
})

//require a object with the user id and message content {message:'', userId:''}
router.post('/', async(req,res)=>{
    req.body.user = mongoose.Types.ObjectId(req.body.userId)
    await services.ChatService.save(req.body)
    res.send('message saved')
})

router.post('/addUser', async(req,res)=>{
    await services.UserService.save({
        first_name:'Manuel',
        last_name:'Florez',
        email:'m@mail.com'
    })
    res.send('user created')
})
export default router