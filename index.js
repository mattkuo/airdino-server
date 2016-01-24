var io = require('socket.io')();

io.on('connect', function(socket) {
  socket.send('hi');

  socket.on('client_message', function(msg) {
    console.log("Received client message");
    socket.send('Reply: ' + msg);
  });
});

io.listen(7777);
