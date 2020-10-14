const { static } = require('express');
const express = require('express');
// Initalise app to be a function handler '/' that gets called when we hit our website home
const app = express();
const server = require('http').createServer(app);
const path = require('path');
// Initialise Socket.IO in our server by passing the sever
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Send files from static folder when requested by client

app.use(express.static(path.join(__dirname, '/static')));

// Listen on connection event for incoming sockets and log to console

io.on('connection', (socket) => {
  socket.username = 'Anonymous';
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });
  socket.on('chat', (message) => {
    io.emit('chat', { message, id: socket.id });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('listening on: ', port);
});
