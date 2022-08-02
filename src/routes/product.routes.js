import { Router } from "express"
import ProductManager from '../managers/product.manager.js'
import UserManager from "../managers/user.manager.js"


const router = Router()
const productService = new ProductManager()

router.post('/newProduct', async(req,res)=>{
    console.log('entran al api')
    console.log(req.body)
    /* const {name,price,img} = req.body 
    if(!name||!price||!img)return res.status(400).send({status:'error', error:'Incomplete values'})
    await productService.addProducts(req.body) */
    res.send({status:'success', message:'Product added'})
})

export default router