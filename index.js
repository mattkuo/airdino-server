var io = require('socket.io')();

var isMobile = false,
    isClient = true;
var playerMapping = {};
var currentSockId;

// Listen for player connect

// TODO: Namspace stuff
// var clientNamespace = io.of('/clients');
// var mobileNamespace = io.of('/mobile');
//
// clientNamespace.on('connect', function(socket) {
//   console.log('A client has connected');
//
// });
//
//
// mobileNamespace.on('connect', function(socket) {
//   console.log('A mobile has connected');
//
//   // TODO: Implement speed controls
//   socket.on('speed', function(id, msg)) {
//
//   }
//
//
// });


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
      io.emit('gyro', {
        beta: reading.beta,
        gamma: reading.gamma,
        alpha: reading.alpha
      });
      console.log("beta: " + reading.beta + " gamma: " + reading.gamma + " alpha: " + reading.alpha);
    });

    socket.on('speed', function(speed) {
      io.emit('speed', {speed: speed});
      console.log('Speed changed to: ' + speed);
    });

    switchClientWeb();
  }

});

function switchClientWeb() {
  isMobile = !isMobile;
  isClient = !isClient;
}

io.listen(7777);
