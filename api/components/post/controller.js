const TABLA = 'post'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store){
        store = require('../../../store/dummy')
    }

    function list() {
        return store.list(TABLA)
    }

    function get(id) {
        return store.get(TABLA,id)
    }

    function edit(data) {
        
    }

    function create(data) {
        
    }

    return {
        list,
        get,
        edit,
        create
    }
}



