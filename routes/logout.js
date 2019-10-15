var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.clearCookie('access_token');
    res.clearCookie('userId');
    res.redirect('/');
})

module.exports = router;
