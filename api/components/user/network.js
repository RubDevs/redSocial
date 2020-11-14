const express = require('express');

const router = express.Router();
const response = require('../../../network/response')

router.get('/api/user',function(req, res){
    response.success(req,res,'Todo ok',200)
})

module.exports = router