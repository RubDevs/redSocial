const express = require('express');

const router = express.Router();

router.get('/api/user',function(req, res){
    res.send('Ok')
})

module.exports = router