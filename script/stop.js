const io = require('socket.io-client');
const socketClient = io.connect('http://localhost:9001'); // Specify port if your express server is not using default port 80

socketClient.emit('npmStop');
setTimeout(() => {
  process.exit(0);
}, 1000);
