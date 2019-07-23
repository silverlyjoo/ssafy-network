var jwt = require('jsonwebtoken');

function decode(token){
    return jwt.verify(token,"PsjPsmHmwKktMhi",function(err,decoded){
        if(err) {
            console.log("유효하지 않는 토큰입니다");
            return false;
        }
        else{
            return decoded;
        }
    });
}

module.exports = decode;