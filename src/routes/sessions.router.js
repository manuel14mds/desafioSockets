import {Router} from 'express'
import services from '../dao/index.js';
import { createHash, isValidPassword } from '../utils.js'
import __dirname from '../utils.js';

const router = Router();
router.post('/register',async (req,res)=>{
    console.log('entra a session router register')
    const {name,email,password} = req.body;
    if(!name||!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"})
    //¿El usuario ya está en la base de datos?
    const exists = await services.UserService.getByEmail(email)
    if(exists) return res.status(400).send({status:"error",error:"User already exists"})
    //Insertamos en la base
    const newUser = {
        name,
        email,
        password:createHash(password)
    }

    let result = await services.UserService.save(newUser)
    res.render('login')
    //res.send(result);
})


router.post('/login',async(req,res)=>{
    let {email,password } = req.body
    if(!email||!password) return done(null,false,{message:"Incomplete values"})
    const user = await services.UserService.getByEmail(email)
    if(!user) return res.status(400).send({status:"error",error:"Incorrect credentials"})
    if(!isValidPassword(user,password))return res.status(400).send({status:"error",error:"Incorrect credentials"})
    req.session.user = {
        name:user.name,
        email:user.email,
        id:user._id
    }
    res.send({status:'success',payload:req.session.user})
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})
export default router