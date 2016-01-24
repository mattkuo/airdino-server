var io = require('socket.io')();

var isMobile = false,
    isClient = true;
var playerMapping = {};
var currentSockId;

// Listen for player connect
io.on('connect', function(socket) {
  console.log('client connected');

  if (isClient) {
    // Current connection is a client
    playerMapping[socket.id] = {
      'socket': socket,
      'mobile': null
    }
    currentSockId = socket.id;
    switchClientWeb();

  }

  if (isMobile) {
    // Current connection is web
    playerMapping[currentSockId]['mobile'] = socket;
    // Listen for gyrometer reading
    socket.on('gyro', function(reading) {
      var client = playerMapping[currentSockId].socket;
      client.broadcast.to(currentSockId).emit('gyro', {
        beta: reading.beta,
        gamma: reading.gamma,
        alpha: reading.alpha
      });
      console.log("beta: " + reading.beta + " gamma: " + reading.gamma + " alpha: " + reading.alpha);
    });
    switchClientWeb();
  }

});

function switchClientWeb() {
  isMobile = !isMobile;
  isClient = !isClient;
}

io.listen(7777);
