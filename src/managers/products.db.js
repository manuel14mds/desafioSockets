import db from '../db/sqlBase.js'

class Product{

    getAll = async()=>{
        try {
            let products = await db('products').select('*')
            if(products.length===0){
                return []
            }else {
                return products
            }
        } catch (error) {
            console.log('products.db.js getAll error', error)
        }
    }

    addProduct = async(newProduct) =>{
        try {
            let result = await db('products').insert([newProduct])
            return result
        } catch (error) {
            console.log('products.db.js addProduct error', error)
        }
    }

}

export default Product