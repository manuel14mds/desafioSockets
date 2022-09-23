import {Router} from 'express'
import __dirname from '../utils.js';
import passport from 'passport';



const router = Router();
router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/registerfail'}), async (req,res)=>{
    res.send({status:'success',payload:req.user._id})
})


router.post('/login', passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}), async(req,res)=>{

    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:'success',payload:req.session.user})
})

router.get('/registerfail', (req,res)=>{
    console.log('register error')
    res.status(500).send({status:'error', error:'Register error'})
})
router.get('/loginfail', (req,res)=>{
    console.log('login error')
    res.status(500).send({status:'error', error:'Login error'})
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

router.get('/data',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('data',{user:req.session.user});
})

export default router