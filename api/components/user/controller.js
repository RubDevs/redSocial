const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user'

//dependency injection
module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy')
    }
    function list(){
        return store.list(TABLA)
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