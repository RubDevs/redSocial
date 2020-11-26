const controller = require('./controller')
const config = require('../../../config')
//const store = require('../../../store/mysql')

let store, cache 

if(config.remoteDB === true) {
    store = require('../../../store/remote-mysql')
    cache = require('../../../store/remote-cache')
}else {
    store = require('../../../store/mysql')
    cache = require('../../../store/redis')
}


//dependency injection
module.exports = controller(store,cache)