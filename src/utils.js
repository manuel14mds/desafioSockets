import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const objectTransform = (data) => {
    let aux = []
    let chat={}
    for (const item of data) {
        chat = {
            id: item._id.toString(),
            message:item.message,
            user:{
                id: item.user._id.toString(),
                first_name: item.user.first_name,
                last_name:item.user.last_name,
                role:item.user.role,
                age:item.user.age,
                active:item.user.active,
                email:item.user.email
            }
        }
        aux.push(chat)
        chat={}
    }
    return aux
}