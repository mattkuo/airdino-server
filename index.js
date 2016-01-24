var io = require('socket.io')();

io.on('connect', function(socket) {
  console.log('client connected');
  socket.emit('hello_world', {hello: 'world'});

  socket.on('client_message', function(msg) {
    console.log("Received client message");
    socket.send('Reply: ' + msg);
  });
});

io.listen(7777);
