const db = {
    'user': [
        {
            id: 1,
            name: 'Ruben'
        },
    ],
}

async function list(table){
    return db[table];
}

async function get(table, id){
    let collection = await list(table);
    return collection.filter(item => item.id == id)[0] || null;
}

function upsert(table, data){
    db[table].push(data)
}

function remove(table, id){
    return true
}

module.exports = {
    list: list,
    upsert: upsert,
    get: get,
    remove: remove
}