import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'

import ChatDB from './managers/chat.db.js'
import ProductDB from './managers/products.db.js'
import mongoose from 'mongoose'
import services from './dao/index.js'

const app = express()
const PORT = process.env.PORT||8080
const server = app.listen(PORT, ()=> console.log(`listening on ${PORT}port`))
const io = new Server(server)

mongoose.connect('mongodb+srv://manu:123@clusterprueba.fp95ssd.mongodb.net/cafeCartagena?retryWrites=true&w=majority', err=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected to Atlas Mongo')
    }
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)


const productDb = new ProductDB()
const chats = new ChatDB()

let products
let log

io.on('connection', async (socket) => {
    //products = await productDb.getAll()
    products = await services.ProductService.getAll()
    //log = await chats.getAll()
    log = await services.ChatService.getAll()
    console.log('log', log)
    console.log('Socket connected')
    socket.broadcast.emit('newUserConnected')
    io.emit('log', log)
    socket.emit('productList', { products })

    socket.on('message', async(data) => {
        //let currentTime = new Date();
        //data.date = currentTime.toLocaleTimeString();
        //await chats.addChat(data)

        console.log(data)
        await services.ChatService.save(data)


        //log = await chats.getAll()
        log = await services.ChatService.getAll()
        io.emit('log', log)
    })
    
    socket.on('addProduct', async (data) => {
        //await productDb.addProduct(data)
        await services.ProductService.addProduct(data)

        //products = await productDb.getAll()

        products = services.ProductService.getAll()
        io.emit('productList', { products })
    })
})
