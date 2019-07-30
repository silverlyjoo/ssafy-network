var jwt = require('jsonwebtoken');

function encode(info){
    var token = jwt.sign({
        membership : info.membership,
        },
        "PsjPsmHmwKktMhi",
        {
        expiresIn: '600m'
    });
    return token;
  }
  
module.exports = encode;