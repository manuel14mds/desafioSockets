import { Router } from "express"
import ProductManager from '../managers/product.manager.js'




const router = Router()
const productService = new ProductManager()

router.post('/newProduct', async(req,res)=>{
    console.log('entran al api')
    console.log(req.body)
    res.send({status:'success', message:'Product added'})
})

export default router