import db from '../db/sqlBase.js'

class HistoryChatDB{

    getAll = async()=>{
        try {
            let chats = await db('log').select('*')
            if(chats.length===0){
                return []
            }else {
                return chats
            }
        } catch (error) {
            console.log(error)
        }
    }

    addChat = async(chat) =>{
        try {
            let result = await db('log').insert([chat])
            return result
        } catch (error) {
            console.log('chat.db.js-addChat error', error)
        }
    }

}

export default HistoryChatDB