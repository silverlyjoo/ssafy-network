const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    mongoose.connect("mongodb://ssafy:network@localhost:27017", {
        dbName: 'ssafy_network'
      },
      function(error) {
        if (error) {
          console.error('mongodb connection error', error);
        }
        else{
          console.log('몽고DB 연결 성공');
        }
      });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
};