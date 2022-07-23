//helper
var board = document.getElementById('game');
var drawer = board.getContext("2d");

board.width = window.innerWidth;
board.height = window.innerHeight;

function drawRect(x, y, width, height, color){
  drawer.beginPath();
  drawer.rect(x, y, width, height);
  drawer.fillStyle = color;
  drawer.strokeStyle = "black";
  drawer.lineWidth = 1;
  drawer.fill();
  drawer.stroke();
}
