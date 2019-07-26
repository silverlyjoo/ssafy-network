var SocketIO = require('socket.io');
var moment = require('moment');
var Chat = require('./models/chat');

module.exports = (server) => {
    var io = SocketIO(server);
    console.log("소켓IO 서버 오픈");

    io.on('connection', function(socket){
        console.log(socket.id,'가 접속 하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        //메세지를 받아 로그에 띄우고 다른 클라이언트에게 전송하는 과정
        socket.on('chat', function(data) {
            
            
            var msg = {
              from: {
                name: data.name,
              },
              msg: data.msg,
              time : moment().format("YYYY-MM-DD HH:mm:ss")
            };

            var chat = new Chat();
            chat.name = msg.from.name;
            chat.msg = msg.msg;
            chat.time = msg.time;

            chat.save(function (err) {
              if (err) {
                  console.error(err);
                  return;
              }
              console.log('Message from %s: %s', chat.name, chat.msg);
            });

            // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
            socket.broadcast.emit('broadcast', msg);
        });

        socket.on('disconnect', function() {
            console.log('유저가 연결을 종료하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        });
    });
};