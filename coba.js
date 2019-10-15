const jwt = require('jsonwebtoken');
const token = jwt.sign({id: "user@seculab-network", email: "seculab@email.com"}, 'gSi4WmttWuvy2ewoTGooigPwSDoxwZOy',{expiresIn: "5m"});
console.log(token);