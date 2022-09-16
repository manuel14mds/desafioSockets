import {Router} from 'express'

const router = Router()

router.get('/register', (req,res)=>{
    res.render('register')
})
router.get('/', (req,res)=>{
    res.render('login')
})
router.get('/home', (req,res)=>{
    if(!req.session.user) return res.redirect('/')
    res.render('home',{user:req.session.user})
})

export default router