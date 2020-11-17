const controller = require('./controller')
const store = require('../../../store/mysql')


//dependency injection
module.exports = controller(store)