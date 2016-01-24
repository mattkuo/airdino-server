var sockets = require('socket.io-client')('http://45.79.134.17:7777');

sockets.on('connect', function() {
  console.log("client connected");
  sockets.on('message', function() {
    console.log('client message received');
  });
  sockets.emit('client_message', {msg: 'client_message'});
});
