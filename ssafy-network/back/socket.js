var SocketIO = require('socket.io');
var moment = require('moment');
var Chat = require('./models/chat');
var Room = require('./models/room');

module.exports = (server) => {
    var io = SocketIO(server);
    console.log("소켓IO 서버 오픈");

    io.on('connection', function(socket){
        socket.on('join', function(data){
          console.log(data.nickname+"님이 입장하셨습니다.");
          socket.join(data._id);

          Room.update({ _id : data._id }, { $push: { userList: data.nickname } }, function (err, output) {
            if (err) {
              console.log(err);
            }
            console.log(output);
            if (!output.n) {
              return;
            }
            Room.findOne({ _id : data._id }, function(err,room){
              io.sockets.in(data._id).emit('userlist',room.userList);
            });
          });

          var msg = {
            room : data._id,
            from: {
              name: "System",
            },
            msg: data.nickname+"님이 입장하셨습니다.",
            time : moment().format("YYYY-MM-DD HH:mm:ss")
          };
          io.sockets.in(data._id).emit('broadcast',msg);
          
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

        socket.on('leave', function(data){
          console.log(data.nickname+"님이 퇴장하셨습니다.");
          socket.leave(data._id);
         
          Room.update({ _id : data._id }, { $pullAll: { userList: [data.nickname] } }, function (err, output) {
            if (err) {
              console.log(err);
            }
            console.log(output);
            if (!output.n) {
              return;
            }
            Room.findOne({ _id : data._id }, function(err,room){
              io.sockets.in(data._id).emit('userlist',room.userList);
            });
          });
         
          var msg = {
            room : data._id,
            from: {
              name: "System",
            },
            msg: data.nickname+"님이 퇴장하셨습니다.",
            time : moment().format("YYYY-MM-DD HH:mm:ss")
          };
          io.sockets.in(data._id).emit('broadcast',msg);
        });
    });
};