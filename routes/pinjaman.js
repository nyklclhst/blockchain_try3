var express = require('express');
var request = require('request');
var router = express.Router();
let ID = [];
let name = [];
let sum = [];
let phone = [];
let barang = [];
let stat = [];
let back = [];

router.get('/', function(req,res,next){
    let cookie = req.cookies.access_token;
    ID = [];
    name = [];
    sum = [];
    phone = [];
    barang = [];
    stat = [];
    back = [];
    if(cookie != undefined){
        cookie = cookie.slice(2,66);
        request.get({url: req.protocol+'://'+req.hostname+':3000/api/DataPeminjaman', headers: { "X-Access-Token": cookie }
        }, function(err,respon,body){
            console.log('status:', respon.statusCode);
            let data = JSON.parse(body);
            if(err == null){
                if(data.length === 0){
                    console.log('Empty Data');
                } else {
                    for(i=0;i<data.length;i++){
                        let temp = data[i].Barang;
                        temp =temp.split('#');
                        let temp1 = data[i].WaktuPengembalian;
                        temp1 = temp1.split('T');
                        ID.push(data[i].IDPeminjaman);
                        name.push(data[i].NamaPeminjam);
                        sum.push(data[i].JumlahBarang);
                        phone.push(data[i].KontakPeminjam);
                        stat.push(data[i].Status);
                        barang.push(temp[1]);
                        back.push(temp1[0]);
                    }
                }
            } else {
                console.log(error)
            }
            res.render('pinjaman', {msg: ID.length, msg1: '', msgs: 'user ada', id: ID, name: name, phone: phone, sum: sum, 
            barang: barang, stat: stat, back: back});
        })
    } else {
        request.get({url: req.protocol+'://'+req.hostname+':3001/api/DataPeminjaman'}, function(err,respon,body){
            console.log('status:', respon.statusCode);
            let data = JSON.parse(body);
            if(err == null){
                if(data.length === 0){
                    console.log('Empty Data');
                } else {
                    for(i=0;i<data.length;i++){
                        let temp = data[i].Barang;
                        temp =temp.split('#');
                        let temp1 = data[i].WaktuPengembalian;
                        temp1 = temp1.split('T');
                        ID.push(data[i].IDPeminjaman);
                        name.push(data[i].NamaPeminjam);
                        sum.push(data[i].JumlahBarang);
                        phone.push(data[i].KontakPeminjam);
                        stat.push(data[i].Status);
                        barang.push(temp[1]);
                        back.push(temp1[0]);
                    }
                }
            } else {
                console.log(error)
            }
            res.render('tempA', {msg: ID.length, msg1: '', msgs: '', id: ID, name: name, phone: phone, sum: sum, 
            barang: barang, stat: stat, back: back});
        })
    }
})

module.exports = router;