//helper
var board = document.getElementById('game');
var drawer = board.getContext("2d");

function drawRect(x, y, width, height, color){
  drawer.beginPath();
  drawer.rect(x, y, width, height);
  drawer.fillStyle = color;
  drawer.fill();
  drawer.stroke();
}