const db = {
    'user': [
        {
            id: 1,
            name: 'Ruben'
        },
    ],
}

async function list(table){
    return db[table] || [];
}

async function get(table, id){
    let collection = await list(table);
    return collection.filter(item => item.id == id)[0] || null;
}

async function upsert(table, data){
    //console.log(data)
    if(!db[table]){
        db[table] = []
    }
    db[table].push(data)
    console.log(db)
    //return data.id
}

async function remove(table, id){
    let collection = await list(table)
    db.user.pop(id)
    return id
}

async function query(table, q) {
    let collection = await list(table)
    let keys = Object.keys(q)
    let key = keys[0]
    return collection.filter(item => item[key] === q[key])[0] || null
}

module.exports = {
    list: list,
    upsert: upsert,
    get: get,
    remove: remove,
    query: query
}