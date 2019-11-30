module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/chat")
    let rooms = []

    nsp.on('connection', function (socket) {
        socket.emit('connected_success')

        socket.on('room', (room) => {
            socket.join(room);
            rooms.push(room);

        });

        socket.on('chat message', (data) => {
            const { room, message } = data
            console.log('got message', message);
            socket.broadcast.to(room).emit('broadcast', message);
        });

        socket.on('leave room', (room) => {
            socket.leave(room);
            var i = rooms.indexOf(room);
            rooms.splice(i, 1);
        });
    });

    io.on('connection', function (socket) {
        console.log('no namespace connection')
    })
}
