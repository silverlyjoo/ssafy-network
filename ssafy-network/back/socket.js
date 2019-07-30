var SocketIO = require('socket.io');
var moment = require('moment');
var Chat = require('./models/chat');

module.exports = (server) => {
    var io = SocketIO(server);
    console.log("소켓IO 서버 오픈");

    io.on('connection', function(socket){
        //console.log(socket.id,'가 접속 하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        
        socket.on('join', function(newroom){
          console.log("누가 방을 바꿈",newroom);
          socket.join(newroom);
        });

        socket.on('chat', function(data) {
            var msg = {
              room : data.room,
              from: {
                name: data.name,
              },
              msg: data.msg,
              time : moment().format("YYYY-MM-DD HH:mm:ss")
            };

            io.sockets.in(data.room).emit('broadcast',msg);
            // var chat = new Chat();
            // chat.name = msg.from.name;
            // chat.msg = msg.msg;
            // chat.time = msg.time;

            // chat.save(function (err) {
            //   if (err) {
            //       console.error(err);
            //       return;
            //   }
            //   console.log('Message from %s: %s', chat.name, chat.msg);
            // });
            console.log('Message %s from %s: %s', data.room,data.name, data.msg);

        });

        socket.on('disconnect', function() {
            console.log('유저가 연결을 종료하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        });
    });
};