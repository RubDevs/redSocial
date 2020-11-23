require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')

const config = require('../config.js');
const app = express();
const post = require('./components/post/network')
const errors = require('../network/errors')

app.use(bodyParser.json())

//Router
app.use('/api/post',post)
app.use(errors)


app.listen(config.post.port, () =>{
    console.log('Servicio posts escuchando en el puerto ', config.post.port)
})