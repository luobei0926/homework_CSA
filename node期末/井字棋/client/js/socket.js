var cvs = document.getElementById('cvs');
var color = '';
var ctx = cvs.getContext('2d');
var socket = io.connect('ws://127.0.0.1:3000');
var GRID_SIZE = 40;
var H_SIZE = null;
var V_SIZE = null;

var checkerboard = [];
var turn = '';
socket.on('conn', function(data) {
    console.log(data);
    color = data.color;
    HORIZONTAL_SIZE = data.hs;
    VERTICAL_SIZE = data.vs;
    cvs.width = HORIZONTAL_SIZE * GRID_SIZE;
    cvs.height = VERTICAL_SIZE * GRID_SIZE;
    if (data.nul === 2) init();
});
socket.on('getCheckerBoard', function(data) {
    console.log(data);
    console.log(data);
    checkerboard = data.checkerboard;
    turn = data.turn;
    if (!cvs.onclick) cvs.onclick = putChess;
})

function init() {
    drawCheckerboard();
    if (color === 'null') return;
    cvs.onclick = putChess;
}

function putChess(e) {
    var x = e.pageX - cvs.offsetLeft;
    var y = e.pageY - cvs.offsetTop;
    x = parseInt(x / GRID_SIZE);
    y = parseInt(y / GRID_SIZE);
    console.log(checkerboard[x][y].state);
    if (checkerboard[x][y].state) return;
    drawArc(x, y);
    document.getElementById('tips').innerText = (whiteTrun === true ? "现在轮到白棋落子" : "现在轮到黑棋落子");

}


function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, (GRID_SIZE / 2) * 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = (whiteTrun === true ? '#eee' : '#000');
    console.log(whiteTrun);
    ctx.fill();
    ctx.closePath();
    checkerboard[x][y].state = 1;
    checkerboard[x][y].type = whiteTrun;
    whiteTrun = !whiteTrun;


};

function drawCheckerboard() {
    for (var i = 0; i < HORIZONTAL_SIZE; i++) {
        for (var j = 0; j < VERTICAL_SIZE; j++) {
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.fillStyle = "#FFC0CB";
            ctx.fillRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            ctx.strokeRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            ctx.closePath();


        }
    }
}