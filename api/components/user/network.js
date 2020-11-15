const express = require('express');

const router = express.Router();
const response = require('../../../network/response')
const Controller = require('./index')

router.get('/',list)
router.get('/:id',get)
router.post('/',upsert)
router.delete('/:id', remove)

//Internal functions

function list(req, res){
    Controller.list()
        .then((list) => {
            response.success(req,res,list,200)
        })
        .catch((error) => {
            response.error(req,res,error.message,500)
        })
}

function get(req, res){
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req,res,user,200)
        })
        .catch((error) => {
            response.error(req,res,error.message,500)
        })
}

function upsert(req, res){
    console.log(req.body)
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req,res,user,200)
        })
        .catch((error) => {
            response.error(req,res,error.message,500)
        })
}

function remove(req,res) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req,res,`Usuario ${user} eliminado`, 200)
        })
        .catch((error) => {
            response.error(req,res,error.message,404)
        })
}

module.exports = router