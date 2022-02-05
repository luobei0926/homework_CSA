function init() {
    for (var i = -5; i < HORIZONTAL_SIZE + 5; i++) {
        checkerboard[i] = [];
        for (var j = -5; j < VERTICAL_SIZE + 5; j++) {
            checkerboard[i][j] = {
                state: 0,
                type: true
            };
        }
    }
    drawCheckerboard();
    cvs.onclick = putChess;
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

function putChess(e) {
    var x = e.pageX - cvs.offsetLeft;
    var y = e.pageY - cvs.offsetTop;
    x = parseInt(x / GRID_SIZE);
    y = parseInt(y / GRID_SIZE);
    console.log(checkerboard[x][y].state);
    if (checkerboard[x][y].state) return;
    drawArc(x, y);
    document.getElementById('tips').innerText = (whiteTrun === true ? "现在轮到白棋落子" : "现在轮到黑棋落子");
    gameover(x, y);
}

function gameover(x, y) {
    if (!checkAllDirectionChess(x, y)) return;
    var chess = whiteTrun ? '黑棋' : '白棋';
    document.getElementById('tips').innerText = (chess + '胜');
    cvs.onclick = null;
}

function checkAllDirectionChess(x, y) {
    if (checkOneLineChess(x - 5, y - 5, 1, 1, checkerboard[x][y].type)) return true;
    if (checkOneLineChess(x, y - 5, 0, 1, checkerboard[x][y].type)) return true;
    if (checkOneLineChess(x + 5, y - 5, -1, 1, checkerboard[x][y].type)) return true;
    if (checkOneLineChess(x - 5, y, 1, 0, checkerboard[x][y].type)) return true;
    return false;
}

function checkOneLineChess(tpx, tpy, xPlus, yPlus, type) {
    var count = 0;
    for (i = 0; i < 10; i++) {
        if (checkerboard[tpx][tpy].type === type && checkerboard[tpx][tpy].state !== 0) {
            count++;
            if (count >= 5) return true;
        } else {
            count = 0;
        }
        tpx += xPlus;
        tpy += yPlus;
    }
}