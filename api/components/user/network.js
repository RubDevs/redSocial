const express = require('express');

const router = express.Router();
const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index');
const user = require('./index');


router.get('/',list)
router.post('/follow/:id',secure('follow'),follow)
router.get('/:id/following', following)
router.get('/:id',get)
router.post('/',insert)
router.put('/', secure('update'), update)
router.delete('/:id', remove)

//Internal functions

function list(req, res,next){
    Controller.list()
        .then((list) => {
            response.success(req,res,list,200)
        })
        .catch(next)
}

function get(req, res,next){
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req,res,user,200)
        })
        .catch(next)
}

function upsert(req, res, next){
    Controller.upsert(req.body)
        .then((user) => {
            console.log(user)
            response.success(req,res,user,200)
        })
        .catch(next)
}

function insert(req,res,next) {
    Controller.insert(req.body)
        .then((user)=>{
            response.success(req,res,user,200)
        })
        .catch(next)
}

function update(req,res,next) {
    Controller.update(req.body)
    .then((user) => {
        response.success(req,res,user,200)
    })
    .cath(next)
}

function follow(req,res,next){
    Controller.follow(req.user.id,req.params.id)
        .then(data => {
            response.success(req,res,data,201)
        })
        .catch(next)
}

function following(req,res,next) {
    return Controller.following(req.params.id) 
        .then((data) => {
            console.log(data)
            return response.success(req,res,data,200)
        })
        .catch(next)
}

function remove(req,res,next) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req,res,`Usuario ${user} eliminado`, 200)
        })
        .catch(next)
}

module.exports = router