var express = require('express');
var crypto = require('crypto');
var request = require('request');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let cookie = req.cookies.access_token;
  if(cookie != undefined){
    console.log('ada cookie');
    cookie = cookie.slice(2,66);
    request.get({url: req.protocol+'://'+req.hostname+':3000/api/system/ping', headers: {"X-Access-Token": cookie}}, function(err,resp,body){
      console.log(resp.statusCode);
      if(resp.statusCode != 200 && resp.statusCode != 500){
        res.render('index',{msg: ''});
      } else if(resp.statusCode === 200){
        res.render('index',{msg: 'user ada'});
      } else if(resp.statusCode === 500){
        res.render('index',{msg: 'input card'});
      }
    })
  } else {
    res.render('index',{msg: ''});
  }
});

router.post('/regis', function(req, res, next){
  const hash = crypto.createHash('sha512');
  let email = req.body.fr_email;
  let username = req.body.fr_username;
  let pass = hash.update(req.body.fr_pass,'utf8').digest('hex');
  let tgl = new Date();
  const data = { "$class": "model.userData", 
    "userID": username+"@seculab-network", 
    "username": username,
    "password": pass,
    "email": email,
    "tglPembuatan": tgl }
  request.post({url: req.protocol+'://'+req.hostname+':3001/api/userData', body: data, json: true},
    function(error, response, body){
      if(error == null){
        // console.log(body)
        if(response.statusCode === 200){
          res.render('index',{msg: 'sukses'});
        } else {
          res.render('index',{msg: 'gagal'});
        }
      } else {
        console.log(body)
        res.render('index',{msg: 'gagal'});
      }
    });
})

router.post('/login', function(req, res, next){
  const hash = crypto.createHash('sha512');
  let email = req.body.fl_email;
  let password = hash.update(req.body.fl_pass,'utf8').digest('hex');
  request.get({url: req.protocol+'://'+req.hostname+':3001/api/userData'}, function(err, resp, body){
    let data = JSON.parse(body);
    if(err == null){
      if(data.length === 0){
        res.render('index',{msg: 'Data Kosong.'});
      } else {
        for(i=0;i<data.length;i++){
          if(email == data[i].email || email == data[i].username){
            console.log('sama');
            let pass = data[i].password;
            if(password == pass){
              console.log('redirect');
              const token = jwt.sign({id: data[i].userID, username: data[i].username}, 'gSi4WmttWuvy2ewoTGooigPwSDoxwZOy', {expiresIn: '5m'});
              res.writeHead(301, {Location: req.protocol+'://'+req.hostname+':3000/auth/jwt/callback?token='+token});
              res.end();
              return;
            } else {
              res.render('index',{msg: 'Wrong Password!'});
              return;
            }
          } else {
            if(i == data.length){
              console.log(i);
              console.log(data.length);
              res.render('index',{msg: 'Can not found username or email!'});
              return;
            }
          }
          console.log(i);
        }
      }
    } else {
      console.log(body)
      res.render('index',{msg: 'gagal'});
    }
  })
})

router.post('/card', function(req,res,next){
  let card = req.files.fr_card;
  let cookie = req.cookies.access_token;
  cookie = cookie.slice(2,66);
  let name = req.body.fr_name;
  const url = req.protocol+'://'+req.hostname+':3000/api/wallet/import?name='+name;
  let formData = {
    'card' :{
      value: card.data,
      options:{
        contentType: card.mimetype,
        filename: card.name
      }
    }
  }
  request.post({ url: url, headers: {"X-Access-Token": cookie}, formData: formData},
  function(er,re,bd){
    if(er === null){
      console.log(bd);
      if(re.statusCode === 204){
        res.writeHead(301,{Location: req.protocol+'://'+req.hostname+':8080/'})
        res.end();
      } else {
        res.render('index',{msg: 'gagal'});
      }
    } else {
      console.log(bd);
      res.render('index',{msg: 'gagal'});
    }
  })
})

module.exports = router;