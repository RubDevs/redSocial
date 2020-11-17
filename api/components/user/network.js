const express = require('express');

const router = express.Router();
const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')


router.get('/',list)
router.get('/:id',get)
router.post('/',upsert)
router.put('/', secure('update'), upsert)
router.delete('/:id', remove)

//Internal functions

function list(req, res){
    Controller.list()
        .then((list) => {
            response.success(req,res,list,200)
        })
        .catch(err => {
            console.error(err)
        })
}

function get(req, res){
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req,res,user,200)
        })
        .catch(next)
}

function upsert(req, res){
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req,res,user,200)
        })
        .catch(next)
}

function remove(req,res) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req,res,`Usuario ${user} eliminado`, 200)
        })
        .catch(next)
}

module.exports = router