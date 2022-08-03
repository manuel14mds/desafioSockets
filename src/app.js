import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/product.routes.js'
import UserManager from './managers/user.manager.js'
import ProductManager from './managers/product.manager.js'

const app = express()
const server = app.listen(8080, ()=>console.log('listening on 8080 port \n'))
const io = new Server(server)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())
//app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.use('/', viewsRouter)
//app.use('/api', productRouter)

const userService = new UserManager()
const productService = new ProductManager()
let log = []
io.on('connection', async (socket)=>{
    console.log('Socket connected')
    socket.broadcast.emit('newUser')

    let products = await productService.getAllProducts()
    
    
    socket.on('message',(data)=>{
        let currentTime = new Date();
        data.date=currentTime.toLocaleTimeString();
        log.push(data)
        io.emit('log',log)
    })
    
    app.render('home', { products, listVoid:products.length==0})
})