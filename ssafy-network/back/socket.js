var SocketIO = require('socket.io');

module.exports = (server) => {
    var io = SocketIO(server,  {pingTimeout: 1000});
    console.log("소켓IO 서버 오픈");

    io.on('connection', function(socket){
      
        //메세지를 받아 로그에 띄우고 다른 클라이언트에게 전송하는 과정
        socket.on('chat', function(data) {
            console.log('Message from %s: %s', data.name, data.msg);
            
            var msg = {
              from: {
                name: data.name,
              },
              msg: data.msg
            };
        
            // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
            socket.broadcast.emit('chat', msg);
        });

        socket.on('disconnect', function() {
            console.log('user disconnected: ');
        });
    });
};