var express = require('express');
var request = require('request');
var router = express.Router();
let ID = [];
let name = [];
let sum = [];

router.get('/', function(req,res,next){
    let cookie = req.cookies.access_token;
    ID = [];
    name = [];
    sum = [];
    if(cookie != undefined){
        cookie = cookie.slice(2,66);
        request.get({ url : req.protocol+'://'+req.hostname+':3000/api/DataBarang',
          headers: { "X-Access-Token": cookie }}, function(error, response, body){
            console.log('status:', response.statusCode);
            let data = JSON.parse(body);
            if(error == null){
                if(data.length === 0){
                    console.log('Empty Data');
                } else {
                    for(i=0;i<data.length;i++){
                        ID.push(data[i].IDBarang);
                        name.push(data[i].NamaBarang);
                        sum.push(data[i].JumlahBarang);
                    }
                }
            } else {
                console.log(error)
            }
            res.render('barang',{id: ID, name: name, sum: sum, msg: ID.length, msg1: '',msgs: 'user ada'})
        })
    } else {
        request.get({ url : req.protocol+'://'+req.hostname+':3001/api/DataBarang'}, function(error, response, body){
            console.log('status:', response.statusCode);
            let data = JSON.parse(body);
            if(error == null){
                if(data.length === 0){
                    console.log('Empty Data');
                } else {
                    for(i=0;i<data.length;i++){
                        ID.push(data[i].IDBarang);
                        name.push(data[i].NamaBarang);
                        sum.push(data[i].JumlahBarang);
                    }
                }
            } else {
                console.log(error)
            }
        res.render('tempB',{id: ID, name: name, sum: sum, msg: ID.length, msg1: '', msgs: ''});
        })
    }
})

module.exports = router;