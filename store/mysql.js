const mysql = require('mysql')
const error = require('../network/errors')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

//connect
let connection

function handleConnection() {
    connection = mysql.createConnection(dbconf)

    connection.connect((error) => {
        if (error) {
            console.error('[db error]', error)
            setTimeout(handleConnection, 2000); 
        } else {
            console.log('DB Connected!')
        }
        
    })

    connection.on('error', error => {
        console.error('[db error]', error)
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection()
        } else {
            throw error
        }
    })
}

handleConnection()

function list(table){
    return new Promise((resolve,reject) =>{
        connection.query(`SELECT * FROM ${table}`,(error,data) => {
            if(error){
                return reject(error)
            }
            resolve(data)
        })
    })
}

function get(table, id){
    return new Promise((resolve,reject) =>{
        connection.query(`SELECT * FROM ${table} where id=${id}`,(error,data) => {
            if(error){
                return reject(error)
            }
            resolve(data)
        })
    })
}

function insert(table, data){
    let user = {
        ...data
    }
    console.log(`Rubs ${user}`)
    return new Promise((resolve,reject) =>{
        connection.query(`INSERT INTO ${table} SET ?`, user ,(error,result) => {
            if(error){
                return reject(error)
            }
            resolve(result)
        })
    })
}

function update(table, data){
    return new Promise((resolve,reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data,data.id] ,(error,result) => {
            if(error){
                return reject(error)
            }
            resolve(result)
        })
    })
}

function query(table, query, join){
    let joinQuery = ''
    if(join){
        const key = Object.keys(join)[0]
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error,result) => {
            if(error){
                return reject(error)
            }
            resolve(result[0] || null)
        })
    })
}

function upsert(table,data) {
    let user = {...data}
    if(data && data.id){
        return insert(table,data)
    } else{
        return insert(table,data)
    }
    
}

module.exports = {
    list,
    get,
    upsert,
    query,
    insert,
    update,
}