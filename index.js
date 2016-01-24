var io = require('socket.io')();

io.attach(9999);

io.on('connect', function(socket) {
  socket.send('hi');

  socket.on('message', function(msg) {
    socket.send('Reply: ' + msg);
  });
});
