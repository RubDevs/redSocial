const jwt = require('jsonwebtoken')

function sign(data) {
    console.log(`Data token ${data}`)
    return jwt.sign(data, 'secreto')
}

module.exports = {
    sign,
}