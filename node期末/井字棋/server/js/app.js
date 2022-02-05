var server = require('http').createServer();
var io = require('socket.io')(server, { cors: true });
var Gobang = require('../lib/gobang');


server.listen(3000, '127.0.0.1');
var gobang = new Gobang();
io.on('connection', function(socket) {
    if (gobang.createPlayer(socket)) {

        socket.emit('conn', {
            color: socket.player.color,
            num: gobang.getPlayerNum(),
            hs: gobang.HORIZONTAL_SIZE,
            vs: gobang.VERTICAL_SIZE,
        });
        if (gobang.getPlayerNum() >= 2) {
            gobang.init();
            broadcast();
        }
    } else {
        socket.emit('conn', {
            color: 'null',
            num: gobang.getPlayerNum(),
            hs: gobang.HORIZONTAL_SIZE,
            vs: gobang.VERTICAL_SIZE,
        });
        broadcast();
    };
    socket.on('disconnect', function() {
        gobang.leftGame(socket);
    });
    socket.on('putchess', function(x, y) {
        x = parseInt(x);
        y = parseInt(y);
        gobang.putchess(x, y);
        broadcast();
        if (gobang.gameover(x, y)) {
            io.sockets.emit('gameover', gobang.turn === 'black' ? 'white' : 'black')
        }
    });

});

function broadcast() {
    io.sockets.emit('getcheckerBoard', {

        turn: gobang.turn,
        checkerBoard: gobang.checkerBoard

    })
}
