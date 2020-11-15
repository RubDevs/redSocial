const controller = require('./controller')
const store = require('../../../store/dummy')


//dependency injection
module.exports = controller(store)