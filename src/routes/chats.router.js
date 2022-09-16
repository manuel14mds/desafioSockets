import {  Router } from "express"
import services from '../dao/index.js'
import mongoose from 'mongoose'
import {normalize, schema} from 'normalizr'
//import { objectTransform } from "../utils.js"

const router = Router()

/* router.get('/', async(req,res)=>{
    let data = await services.ChatService.getAllPopulated()
    let dataAux=objectTransform(data)
    const user = new schema.Entity('users')
    const message = new schema.Entity('messages',{
        user:user
    })
    const normalizerData = normalize(dataAux,[message])

    console.log(normalizerData)
    console.log(JSON.stringify(normalizerData, null, '\t'))
    res.send(normalizerData)
})


router.delete('/', async(req,res)=>{
    await services.ChatService.deleteAll()
    res.send('chats deleted successfully')
}) */

//require a object with the user id and message content {message:'', userId:''}
/* router.post('/', async(req,res)=>{
    req.body.user = mongoose.Types.ObjectId(req.body.userId)
    await services.ChatService.save(req.body)
    res.send('message saved')
})

router.post('/addUser', async(req,res)=>{
    await services.UserService.save({
        first_name:'Julian',
        last_name:'Dominguez',
        email:'J@mail.com'
    })
    res.send('user created')
})
router.get('/users', async(req,res)=>{
    let users = await services.UserService.getAll()
    res.send(users)
}) */

export default router