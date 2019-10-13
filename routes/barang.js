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

router.post('/', function(req,res,next){
    var Id = Math.floor(Math.random() * 1000).toString();
    while(Id.length < 5){
        Id = 0 + Id;
    }
    Id = 'ID_' + Id;
    let cookie = req.cookies.access_token;
    cookie = cookie.slice(2,66);
    let uname = req.body.user;
    let idbar = req.body.idbarang;
    let jumbar = req.body.jumlah_brg;
    let kontak = req.body.contact;
    let kembali = req.body.kembali;
    let temp = 0;
    for(i=0;i<ID.length;i++){
        if(idbar == ID[i]){
            temp = sum[i];
        }
    }
    if(jumbar > temp){
        res.render('barang',{id: ID, name: name, sum: sum, msg: ID.length, msg1: 'Jumlah Barang Lebih',msgs: 'user ada'});
    } else {
        const data = { "$class": "model.DataPeminjaman",
        "IDPeminjaman": Id,
        "NamaPeminjam": uname,
        "KontakPeminjam": kontak,
        "JumlahBarang": jumbar,
        "Barang": "resource:model.DataBarang#"+idbar,
        "Status": "WAITING",
        "WaktuPengembalian": kembali
        };
        console.log(data)
        request.post({ url : req.protocol+'://'+ req.hostname+':3000/api/DataPeminjaman',
            headers: {"X-Access-Token": cookie }, body : data, json : true}, function(error, response, body){
                console.log('statusCode : '+response.statusCode);
                if(error === null){
                    if(response.statusCode === 200){
                        res.render('barang',{id: ID, name: name, sum: sum, msg: ID.length, msg1: 'Success',msgs: 'user ada'});
                    } else {
                        console.log(body)
                        res.render('barang',{id: ID, name: name, sum: sum, msg: ID.length, msg1: 'Failed',msgs: 'user ada'});
                    }
                } else {
                    console.log(body);
                    res.render('barang',{id: ID, name: name, sum: sum, msg: ID.length, msg1: 'Failed',msgs: 'user ada'});
                }
        })
    }
})

module.exports = router;