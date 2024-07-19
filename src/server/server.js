const app = require('express')();
const http = require('http').createServer(app);
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 8081;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors('*'));

app.use('/auth', authRoutes);

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
