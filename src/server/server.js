const app = require('express')();
const http = require('http').createServer(app);

const PORT = 8081;
const STATIC_CHANNELS = [{id: 1, name: 'global_notifications'}, {id: 2, name: 'global_chat'}];

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
      });
    socket.emit('connection', null);
});

app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});