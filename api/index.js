const express = require('express');

const config = require('../config.js');
const app = express();
const user = require('./components/user/network')
//Router
app.use(user)

app.listen(config.api.port, () =>{
    console.log('Api escuchando en el puerto ', config.api.port)
})