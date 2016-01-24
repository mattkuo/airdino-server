var sockets = require('socket.io-client')('http://localhost:7777');

sockets.on('connect', function() {
  console.log("client connected");
  sockets.on('message', function() {
    console.log('client message received');
  });
  sockets.emit('client_message', {msg: 'client_message'});
});
