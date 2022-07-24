//helper
var board = document.getElementById('game');
var wrapper = document.getElementById("gameWrapper");
var drawer = board.getContext("2d");

board.width = wrapper.offsetWidth;
board.height = wrapper.offsetHeight;

function resized(){
  board.width = wrapper.offsetWidth;
  board.height = wrapper.offsetHeight;

}

function drawRect(x, y, width, height, color){
  drawer.beginPath();
  drawer.rect(x, y, width, height);
  drawer.fillStyle = color;
  drawer.strokeStyle = "black";
  drawer.lineWidth = 1;
  drawer.fill();
  drawer.stroke();
}
