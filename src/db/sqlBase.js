import knex from "knex"

let db = knex({
    client: 'sqlite3',
    connection: {
        filename:'./sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
})

try {
    let exists = await db.schema.hasTable('log')
    if(!exists){
        await db.schema.createTable('log', (table) =>{
            table.primary('id')
            table.increments('id')
            table.string('userName', 30).nullable(false)
            table.string('message', 30).nullable(false)
            table.string('date', 20)
        })
    }
    let Pexists = await db.schema.hasTable('products')
    if(!Pexists){
        await db.schema.createTable('products', (table) =>{
            table.primary('id')
            table.increments('id')
            table.string('name', 30).nullable(false)
            table.float('price').nullable(false)
            table.string('img', 90)
        })
    }

} catch (error) {
    console.log('sqlBase.js error',error)
}

export default db