const io = require('socket.io-client');
const socketClient = io.connect('http://localhost:9001');

socketClient.emit('npmStop');
setTimeout(() => {
  process.exit(0);
}, 1000);
