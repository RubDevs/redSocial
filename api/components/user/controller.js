const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user'

//dependency injection
module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache
    if(!store){
        store = require('../../../store/dummy')
    }

    if(!cache){
        cache = require('../../../store/dummy')
    }

    async function list(){
        let users = await cache.list(TABLA)
        if(!users){
            console.log('No esta en cache, buscando en base de datos')
            users = await store.list(TABLA)
            cache.upsert(TABLA,users)
        }else{
            console.log('Datos devueltos desde cache')
        }
        return users
        
    }

    function get(id){
        return store.get(TABLA,id)
    }

    async function upsert(data){
        const user = {
            name: data.name,
            username: data.username
        }

        if(data.id){
            user.id = data.id
        }else{
            user.id = nanoid.nanoid()
        }

        if(data.username || data.password){
            await auth.upsert({
                id: user.id,
                username: data.username,
                password: data.password
            })
        }

        return store.upsert(TABLA,user)
    }

    async function insert(data) {
        const user = {
            name: data.name,
            username: data.username
        }

        if(data.id){
            user.id = data.id
        }else{
            user.id = nanoid.nanoid()
        }

        if(data.username || data.password){
            await auth.upsert({
                id: user.id,
                username: data.username,
                password: data.password
            })
        }

        return store.insert(TABLA,user)
    }

    async function update(data) {
        const user = {
            name: data.name,
            username: data.username 
        }

        if(data.username || data.password){
            await auth.upsert({
                id: user.id,
                username: data.username,
                password: data.password
            })
        }

        return store.update(TABLA, user)
    }

    function follow(from,to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to
        })
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_from'
        const query = { user_from: user }
        return await store.query(TABLA + '_follow', query, join )
    }

    function remove(id) {
        return store.remove(TABLA,id)
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
        insert,
        update
    }
}