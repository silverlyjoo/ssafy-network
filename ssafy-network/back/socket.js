var SocketIO = require('socket.io');
var moment = require('moment');

module.exports = (server) => {
    var io = SocketIO(server,  {pingTimeout: 1000});
    console.log("소켓IO 서버 오픈");

    io.on('connection', function(socket){
        console.log('유저가 접속 하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        //메세지를 받아 로그에 띄우고 다른 클라이언트에게 전송하는 과정
        socket.on('chat', function(data) {
            console.log('Message from %s: %s', data.name, data.msg);
            
            var msg = {
              from: {
                name: data.name,
              },
              msg: data.msg,
              time : moment().format("YYYY-MM-DD HH:mm:ss")
            };
        
            // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
            socket.broadcast.emit('chat', msg);
        });

        socket.on('disconnect', function() {
            console.log('유저가 연결을 종료하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        });
    });
};