
var canvy = document.getElementById('game');
var goButton = document.getElementById("pauseGoButton");
var generations = document.getElementById("generationNum");
var stepButton = document.getElementById("frameAdvanceButton");
var speedSlider = document.getElementById("speedSlider");
var zoomSlider = document.getElementById("zoomSlider")
var miliseconds = document.getElementById("timeStep");
var zoomLevel = document.getElementById("zoomLevel")
var restartButton = document.getElementById("restartButton");
var color = document.getElementById("colorChange");
var bgColor = document.getElementById("colorChange_Background");
var resetColors = document.getElementById("resetDefault");

//default speed
var down = false;
var speed = 500;
var zoom = 1;
var going = false;
var gen = 1;
var loop;
var liveCellColor = "#e60b0b";
var deadCellColor="#2b2b2b";

//colors to default
function defaultColors(){
  liveCellColor = "#e60b0b";
  deadCellColor="#2b2b2b";
}
//cell color changing
color.oninput = function colorChanger() {
  liveCellColor = this.value;
}
//dead cell color changing
bgColor.oninput = function colorChangerBackground() {
  deadCellColor = this.value;
}

//make slider a default upon reload
speedSlider.oninput = function defaultSlider() {
  speed = this.value;
  miliseconds.textContent = speed + "ms";
}

zoomSlider.oninput = function(){
  zoom = this.value;
  zoomLevel.textContent = zoom;
  console.log(drawer.getTransform())
  drawer.setTransform(this.value, 0, 0, this.value, drawer.getTransform().e, drawer.getTransform().f);
  drawer.save()
  redrawGrid();
}
//pause and go button
function toggleGo(){
  going = !going;
  if(going){
    document.getElementById("pauseImg").style.display = 'inline';
    document.getElementById("goImg").style.display = 'none';
    loop = setInterval(generation, speed);
    //slider thing
    speedSlider.oninput = function() {
      speed = this.value;
      miliseconds.textContent = speed + "ms";
      clearInterval(loop);
      loop = setInterval(generation, speed);
    }
  }
  else {
    clearInterval(loop);
    document.getElementById("pauseImg").style.display = 'none';
    document.getElementById("goImg").style.display = 'inline';
    //slider thing
    speedSlider.oninput = function() {
      speed = this.value;
      miliseconds.textContent = speed + "ms";
    }
  }
}
//click cells to change status
function clickCells(event){
  var currentTransform = drawer.getTransform();
  var xTrans = currentTransform.e
  var yTrans = currentTransform.f
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      if(event.layerX > (cell.x) * zoom + xTrans
        && event.layerX < (cell.right) * zoom + xTrans
        && event.layerY > (cell.y) * zoom + yTrans
        && event.layerY < (cell.bottom) * zoom + yTrans){
          cell.changeAlive();
          cell.draw(liveCellColor, deadCellColor);
        }
    }
  }
}
//grid maker
//columns
var columns = board.width/Cell.SIZE;
//rows
var rows = board.height/Cell.SIZE;
//grid array
var grid = [];
var row = [];
function makeGrid(){
  var x = 0;
  var y = 0;
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = new Cell(x, y, false);
      row.push(cell);
      cell.draw(liveCellColor, deadCellColor);
      x += Cell.SIZE;
    }
    grid.push(row);
    row = [];
    y += Cell.SIZE;
    x = 0;
  }
}
makeGrid();

//check neighbors, change status accordingly
function checkNeighbors(){
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      //check to make sure its possible lul
      //cell above
      if(j-1 >= 0){
        if(grid[j-1][i].isAlive){
          cell.neighbors++;
        }
      }
      //cell below
      if(j+1 < rows){
        if(grid[j+1][i].isAlive){
          cell.neighbors++;
        }
      }
      //cell to the left
      if(i-1 >= 0){
        if(grid[j][i-1].isAlive){
          cell.neighbors++;
        }
      }
      //cell to the right
      if(i+1 < columns){
        if(grid[j][i+1].isAlive){
          cell.neighbors++;
        }
      }
      //diagonal top left cell
      if(j-1 >= 0 && i-1 >= 0){
        if(grid[j-1][i-1].isAlive){
          cell.neighbors++;
        }
      }
      //diagonal top right cell
      if(j-1 >= 0 && i+1 < columns){
        if(grid[j-1][i+1].isAlive){
          cell.neighbors++;
        }
      }
      //diagonal bottom left cell
      if(j+1 < rows && i-1 >= 0){
        if(grid[j+1][i-1].isAlive){
          cell.neighbors++;
        }
      }
      //diagonal bottom right cell
      if(j+1 < rows && i+1 < columns){
        if(grid[j+1][i+1].isAlive){
          cell.neighbors++;
        }
      }
    }
  }
}
function changeState(){
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      //change board depending on number of num neighbors
      //if the cell is living and has more than 3 or less than 2 neighbors,
      //it dies
      if(cell.isAlive && cell.neighbors < 2){
        cell.changeAlive();
      }
      else if(cell.isAlive && cell.neighbors > 3){
        cell.changeAlive();
      }
      //if cell is dead and has 3 neighbors, it becomes alive
      else if(!cell.isAlive && (cell.neighbors == 3)){
        cell.changeAlive();
      }
      cell.neighbors = 0;
    }
  }
}
//once neighbors are checked, update the game board with new values
function generation(){
  checkNeighbors();
  changeState();
  //draw updated grid
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      cell.draw(liveCellColor, deadCellColor);
    }
  }
  generations.textContent = gen;
  gen++;
}
//generation stepper
function step(){
  if(!going){
    generation();
  }
}
//reset
function reset(){
  drawer.clearRect(0, 0, board.width, board.height);
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      cell.isAlive = false;
      cell.draw(liveCellColor, deadCellColor);
    }
  }
  gen = 0;
  generations.textContent = gen;
}
function redrawGrid(){
  drawer.setTransform(1, 0, 0, 1, 0, 0);
  drawer.clearRect(0, 0, board.width, board.height);
  drawer.restore()
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      cell.draw(liveCellColor, deadCellColor);
    }
  }
}
//events
document.addEventListener('mousedown', () => down = true);
document.addEventListener('mouseup', () => {
  down = false
  canvy.style.cursor = "default"; 
});
//for dragging canvas
document.addEventListener('mousemove', function(e){
  if(e.target != canvy) return
  if(!down) return
  canvy.style.cursor = "grabbing";
  drawer.translate(e.movementX,e.movementY)
  drawer.save()
  redrawGrid();
});

canvy.addEventListener("click", clickCells);
goButton.addEventListener("click", toggleGo);
stepButton.addEventListener("click", step);
restartButton.addEventListener("click", reset);
resetColors.addEventListener("click", defaultColors);
window.addEventListener("resize", resized);
