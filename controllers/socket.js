module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/talk")
<<<<<<< HEAD
=======
    let rooms = ["Immigration", "Women's Rights", "Foster Families", "LGBTQIA", "Civil Rights", "Animals", "Environment", "International", "Community Developement", "Public Policy", "Gun Safety"]
>>>>>>> 7769d04ba4197060ca17ee56b7b536d11bcd698b

    nsp.on('connection', function (socket) {
        socket.emit('connected_success')

        socket.on('room', (room) => {
            socket.join(room);
            rooms.push(room);

        });

        for (const room of this.rooms) {
            socket.on('chat message', (data) => {
                const { room, message } = data
                console.log('got message', message);
                socket.broadcast.to(room).emit('broadcast', message);
            });
        };

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
