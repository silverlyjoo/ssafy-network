const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('kkt:ssafy@localhost:27017', {
        dbName: 'ssafy_network'
      },
      function(error) {
        if (error) {
          console.error('mongodb connection error', error);
        }
        console.log('mongodb connected');
      });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  //require('./user.js'); 
};