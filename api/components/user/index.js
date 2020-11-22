const controller = require('./controller')
//const store = require('../../../store/mysql')
const store = require('../../../store/remote-mysql')


//dependency injection
module.exports = controller(store)