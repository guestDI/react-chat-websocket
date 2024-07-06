const app = require('express')();
const http = require('http').createServer(app);

const PORT = 8081;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.emit('connection', null);
});
