var express = require('express');
var request = require('request');
var router = express.Router();
let transID = [];
let transType = [];
let transInvoked = [];
let transInvoking = [];
let identityUse = [];
let transTime = [];

router.get('/', function(req,res,next) {
    let cookie = req.cookies.access_token;
    transID = [];
    transType = [];
    transInvoked = [];
    transInvoking = [];
    identityUse = [];
    transTime = [];
    if(cookie != undefined){
        request.get({url: req.protocol+'://'+req.hostname+':3001/api/system/historian'}, function(err,resp, body){
        console.log('status:', resp.statusCode);
        let data = JSON.parse(body);
        if(err == null){
            if(data.length === 0){
                console.log('Empty Data');
            } else {
                for(i=0;i<data.length;i++){
                    transID.push(data[i].transactionId);
                    transType.push(data[i].transactionType);
                    let temp = data[i].transactionInvoked;
                    temp = temp.split('.');
                    transInvoked.push(temp[4]);
                    if(data[i].participantInvoking == undefined){
                        transInvoking.push('None');
                    } else {
                        temp = data[i].participantInvoking;
                        temp = temp.split('.');
                        if(temp.length > 3){
                            transInvoking.push(temp[4]);
                        } else {
                            transInvoking.push(temp[1]);
                        }
                    }
                    if(data[i].identityUsed == undefined){
                        identityUse.push('None');
                    } else {
                        temp = data[i].identityUsed;
                        temp = temp.split('.');
                        identityUse.push(temp[4]);
                    }
                    transTime.push(data[i].transactionTimestamp);
                }
            }
        } else {
            console.log(err);
        }
        res.render('history',{msg: transID.length, msg1: '', msgs: 'user ada', id: transID, type: transType, invoked: transInvoked,
            invoking: transInvoking, identity: identityUse, time: transTime});
        })
    } else {
        request.get({url: req.protocol+'://'+req.hostname+':3001/api/system/historian'}, function(err,resp, body){
        console.log('status:', resp.statusCode);
        let data = JSON.parse(body);
        if(err == null){
            if(data.length === 0){
                console.log('Empty Data');
            } else {
                for(i=0;i<data.length;i++){
                    transID.push(data[i].transactionId);
                    transType.push(data[i].transactionType);
                    let temp = data[i].transactionInvoked;
                    temp = temp.split('.');
                    transInvoked.push(temp[4]);
                    if(data[i].participantInvoking == undefined){
                        transInvoking.push('None');
                    } else {
                        temp = data[i].participantInvoking;
                        temp = temp.split('.');
                        transInvoking.push(temp[4]);
                    }
                    if(data[i].identityUsed == undefined){
                        identityUse.push('None');
                    } else {
                        temp = data[i].identityUsed;
                        temp = temp.split('.');
                        identityUse.push(temp[4]);
                    }
                    transTime.push(data[i].transactionTimestamp);
                }
            }
        } else {
            console.log(err);
        }
        res.render('history',{msg: transID.length, msg1: '', msgs: '', id: transID, type: transType, invoked: transInvoked,
            invoking: transInvoking, identity: identityUse, time: transTime});
        })
    }
});

module.exports = router;
