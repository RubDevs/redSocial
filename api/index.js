require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const config = require('../config.js');
const app = express();
const user = require('./components/user/network')

const swaggerDoc = require('./swagger.json')

app.use(bodyParser.json())
//Router
app.use('/api/user',user)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDoc))


app.listen(config.api.port, () =>{
    console.log('Api escuchando en el puerto ', config.api.port)
})