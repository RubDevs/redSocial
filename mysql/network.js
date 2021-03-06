const express = require('express');

const router = express.Router();
const response = require('../network/response');
const Store = require('../store/mysql')

router.get('/:table',list)
router.get('/:table/:id',get)
router.post('/:table',insert)
router.put('/:table/:id',update)

async function list(req,res,next) {
    const data = await Store.list(req.params.table)
    response.success(req,res,data,200)
}

async function get(req,res,next){
    const data = await Store.get(req.params.table,req.params.id)
    response.success(req,res,data,200)
}

async function insert(req,res,next){
    const data = await Store.insert(req.params.table,req.body)
    response.success(req,res,data,200)
}

async function update(req,res,next){
    const data = await Store.update(req.params.table,req.body)
    response.success(req,res,data,200)
}



module.exports = router