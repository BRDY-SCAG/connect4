const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('CLIENT'));

// app.get('/', function(req, res){
//     res.sendFile(__dirname + 'CLIENT/index.html');
// });

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('disconnect', () => {
        console.log(
            'user disconnected: ', socket.id
            );
    });
});

const PORT = 3000;

server.listen(PORT, () => console.log('Server listening on Port: ${PORT}'));
