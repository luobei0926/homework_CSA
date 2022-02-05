var GRID_SIZE = 40;
var HORIZONTAL_SIZE = 15;
var VERTICAL_SIZE = 12;

var CVS = document.getElementById('cvs');
var ctx = cvs.getContext('2d');

var checkerboard = [];
var whiteTrun = true;
cvs.width = GRID_SIZE * HORIZONTAL_SIZE;
cvs.height = GRID_SIZE * VERTICAL_SIZE;
document.getElementById("reStart").onclick = function() {
    document.getElementById("tips").innerText = '';
    init();
}
init();