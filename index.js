var io = require('socket.io')();

var isMobile = false,
    isWeb = true;
var playerMapping = {};
var currentSockId;

// Listen for player connect
io.on('connect', function(socket) {
  console.log('client connected');

  if (isWeb) {
    // Current connection is a client
    playerMapping[socket.id] = {
      'socket': socket,
      'mobile': null
    }
    currentSockId = socket.id;
    switchClientWeb();

    // Listen for gyrometer reading
    socket.on('gyro', function(reading) {
      console.log("beta: " + reading.beta + " gamma: " + reading.gamma + " alpha: " + reading.alpha);
    });
  }

  if (isMobile) {
    // Current connection is web
    playerMapping[currentSockId]['mobile'] = socket;
    switchClientWeb();
  }

});

function switchClientWeb() {
  isMobile = !isMobile;
  isWeb = !isWeb;
}

io.listen(7777);
