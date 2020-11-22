const express = require('express');

const router = express.Router();
const response = require('../../../network/response')
const Controller = require('./index')


router.get('/',list)
router.get('/:id',get)

function list(req,res,next) {
    Controller.list()
        .then(data => {
            response.success(req,res,data,200)
        })
        .catch(next)
}

function get(req,res,next) {
    Controller.get(req.params.id)
        .then(post =>{
            response.success(res,res,post,200)
        })
        .catch(next)
}

function edit(req,res,next){
    
}

module.exports = router