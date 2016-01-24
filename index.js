var io = require('socket.io')();

io.on('connect', function(socket) {
  console.log('client connected');
  socket.emit('hello_world', {hello: 'world'});

  socket.on('gyro', function(reading) {
    console.log("beta: " + reading.beta + " gamma: " + reading.gamma + " alpha: " + reading.alpha);
  });
});

io.listen(7777);
