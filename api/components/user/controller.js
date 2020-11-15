const nanoid = require('nanoid')

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

    function upsert(data){
        const user = {
            name: data.name
        }
        if(data.id){
            user.id = data.id
        }else{
            user.id = nanoid.nanoid()
        }
        return store.upsert(TABLA,user)
    }

    function remove(id) {
        return store.remove(TABLA,id)
    }

    return {
        list,
        get,
        upsert,
        remove
    }
}