const GRID_SIZE = 40;
const HORIZONTAL_SIZE = 10;
const VERTICAL_SIZE = 10;
class Gobang {
    constructor() {
        this.HORIZONTAL_SIZE = HORIZONTAL_SIZE;
        this.VERTICAL_SIZE = VERTICAL_SIZE;
        this.players = [];
        this.checkerBoard = [];
        this.colorList = ['white', 'black'];
        this.gaming = false;
        this.turn = 'black';
        // this.resetList = [];
    }
    createPlayer(socket) {
        console.log("soc" + socket);
        let playerCount = this.players.length;
        if (playerCount >= 2) return false;
        let player = {
            socket: socket,
            color: this.colorList.pop(),
        }
        this.players.push(player);
        socket.player = player;

        return true;
    }
    init() {
        for (var i = -5; i < this.HORIZONTAL_SIZE + 5; i++) {
            this.checkerBoard[i] = [];
            for (var j = -5; j < this.VERTICAL_SIZE + 5; j++) {
                this.checkerBoard[i][j] = {
                    state: false,
                    type: true
                };
            }
        }
        this.gaming = true;

    }
    getPlayerNum() {
        return this.players.length;
    }
    leftGame(socket) {
        if (!socket.player) return;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].color === socket.player.color) {
                this.colorList.push(this.players[i].color);
                this.players.splice(i, 1);
                break;
            }
        }
    }
    toggleTurn() {
        this.turn = (this.turn === 'black' ? 'white' : 'black');
    }
    putchess(x, y) {
        this.checkerBoard[x][y].state = true;
        this.checkerBoard[x][y].type = this.turn;
        this.toggleTurn();
        this.gameover(x, y);

    }
    gameover(x, y) {
        return this.checkAllDirectionChess(x, y);

    }

    checkAllDirectionChess(x, y) {
        if (this.checkOneLineChess(x - 5, y - 5, 1, 1, this.checkerBoard[x][y].type)) return true;
        if (this.checkOneLineChess(x, y - 5, 0, 1, this.checkerBoard[x][y].type)) return true;
        if (this.checkOneLineChess(x + 5, y - 5, -1, 1, this.checkerBoard[x][y].type)) return true;
        if (this.checkOneLineChess(x - 5, y, 1, 0, this.checkerBoard[x][y].type)) return true;
        return false;
    }

    checkOneLineChess(tpx, tpy, xPlus, yPlus, type) {
        var count = 0;

        for (var i = 0; i < 10; i++) {
            if (this.checkerBoard[tpx][tpy].type === type && this.checkerBoard[tpx][tpy].state !== 0) {
                count++;
                if (count >= 5) return true;
            } else {
                count = 0;
            }
            tpx += xPlus;
            tpy += yPlus;
        }
    }
}

module.exports = Gobang;
/*function Gobang {
    this.HORIZONTAL_SIZE = HORIZONTAL_SIZE;
    this.VERTICAL_SIZE = VERTICAL_SIZE;
    this.players = [];
    this.checkerBoard = [];
    this.colorList = ['white', 'black'];
    this.gaming = flase;
    this.turn = 'black';
    //   this.resetList = [];
}

Gobang.prototype.createPlayer = function() {

}
var xxx = new Gobang();*/
