// const jwt = require('jsonwebtoken');
// const token = jwt.sign({id: "user@seculab-network", email: "seculab@email.com"}, 'gSi4WmttWuvy2ewoTGooigPwSDoxwZOy',{expiresIn: "5m"});
// console.log(token);

var request = require('request');

request.get({url: 'http://172.16.10.78:3001/api/userData'}, function(err, resp, body){
    let data = JSON.parse(body);
    if(err == null){
        for(i=0;i<data.length;i++){
            if("user@email.com" == data[i].email){
                console.log('sama');
                return;
            } else {
                console.log('tidak sama');
            }
        }
    }
  })