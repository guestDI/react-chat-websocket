const app = require('express')();
const http = require('http').createServer(app);

const PORT = 8081;
const STATIC_CHANNELS = [
  {
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: [],
  },
  {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: [],
  },
];

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

  socket.on('channel-join', ({ channels, id }) => {
    channels.forEach((c) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          socketIO.emit('channel', c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          socketIO.emit('channel', c);
        }
      }
    });
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.emit('connection', null);
});
