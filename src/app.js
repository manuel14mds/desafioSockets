import express from 'express'
import session from 'express-session';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';

import viewsRouter from './routes/views.router.js'
import productRouter from './routes/product.routes.js'
import sessionsRouter from './routes/sessions.router.js'
import chatRouter from './routes/chats.router.js'

import services from './dao/index.js'
import initializePassport from './config/passport.config.js';
import passport from 'passport';


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
app.use(session({
    secret:'c0derSecretString',
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://manu:123@clusterprueba.fp95ssd.mongodb.net/cafeCartagena?retryWrites=true&w=majority",
        ttl:3600
    }),
    resave:false,
    saveUninitialized:false
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewsRouter)
app.use('/api', productRouter)
app.use('/api/sessions',sessionsRouter);
app.use('/chats', chatRouter)


let products
let log

io.on('connection', async (socket) => {
    products = await services.ProductService.getAll()
    //log = await services.ChatService.getAllPopulated()

    console.log('Socket connected')
    socket.broadcast.emit('newUserConnected')
    //io.emit('log', log)
    socket.emit('productList', { products })

    socket.on('message', async(data) => {
        await services.ChatService.save(data)

        //log = await services.ChatService.getAllPopulated()
        //io.emit('log', log)
    })
    
    socket.on('addProduct', async (data) => {
        await services.ProductService.addProduct(data)

        products = services.ProductService.getAll()
        //io.emit('productList', { products })
    })
})
