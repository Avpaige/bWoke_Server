module.exports = server => {
    const io = require('socket.io')(server);
    const nsp = io.of("/talk")
    let rooms = ["Immigration", "Women's Rights", "Foster Families", "LGBTQIA", "Civil Rights", "Animals", "Environment", "International", "Community Developement", "Public Policy", "Gun Safety"]

    nsp.on('connection', function (socket) {
        socket.emit('connected_success', function () {
            console.log("THERE IS A CONNECTION")
        })

        socket.on('room', (room) => {
            socket.join(room);
            rooms.push(room);
            console.log("THERE is someone joining", room)

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
