var SocketIO = require('socket.io');
var moment = require('moment');
var Chat = require('./models/chat');

module.exports = (server) => {
    var io = SocketIO(server);
    console.log("소켓IO 서버 오픈");

    // var room = io.of('/room');
    // room.on('connection', function(socket){
    //   console.log(socket.id,'가 room 에 접속 하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
    //   var req = socket.request;
    //   var {headers : {referer}} = req;
    //   var roomId = referer.split('/')[referer.split('/').length -1].replace(/\?.+/,'');
    //   console.log(roomId);
    //   socket.join(roomId);

    //   socket.to(roomId).emit('join', {
    //     from: {
    //       name: 'System',
    //     },
    //     msg: "손님 한분 입장이요~",
    //     time : moment().format("YYYY-MM-DD HH:mm:ss")
    //   });
      
    //   socket.on('disconnect', function() {
    //     console.log('유저가 room 에서 나갔습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
    //     socket.leave(roomId);

    //     socket.to(roomId).emit('exit', {
    //       from: {
    //         name: 'System',
    //       },
    //       msg: "손님 한분 퇴장이요~",
    //       time : moment().format("YYYY-MM-DD HH:mm:ss")
    //     });
    //   });
    // });

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
            console.log('Message from %s: %s', data.name, data.msg);

            socket.broadcast.emit('broadcast', msg);
            socket.emit('broadcast',msg);
        });

        socket.on('disconnect', function() {
            console.log('유저가 연결을 종료하였습니다: ',moment().format("YYYY-MM-DD HH:mm:ss"));
        });
    });
};