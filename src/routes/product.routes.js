import { Router } from "express"
import services from '../dao/index.js'
import faker from 'faker'

faker.locale = 'es'
const {commerce, image, random} = faker
const router = Router()


router.post('/newProduct', async(req,res)=>{
    console.log('entran al api')
    console.log(req.body)
    res.send({status:'success', message:'Product added'})
})
router.post('/productos-test', async(req,res)=>{
    try {
        for(let i=0; i<5; i++){
            await services.ProductService.addProduct({
                name:commerce.productName(),
                price:commerce.price(),
                stock:15,
                thumbnail:image.imageUrl(),
                code:random.alphaNumeric()
            })
        }
    } catch (error) {
        return res.status(500).send({status:'error', error:"it couldn't create products"})
    }
    res.send({status:'success', message:'Product added'})
})


export default router