const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('Connected to WebSocket server');
  ws.send('Hello from WebSocket client!');
});

ws.on('message', function incoming(message) {
  console.log('Received: %s', message);
});