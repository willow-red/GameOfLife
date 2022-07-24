
var canvy = document.getElementById('game');
var goButton = document.getElementById("pauseGoButton");
var generations = document.getElementById("generationNum");
var stepButton = document.getElementById("frameAdvanceButton");
var slider = document.getElementById("speedSlider");
var miliseconds = document.getElementById("timeStep");
var restartButton = document.getElementById("restartButton");
var color = document.getElementById("colorChange");
//default speed
var speed = 500;
var going = false;
var gen = 1;
var loop;
var liveCellColor = "#e60b0b";
var deadCellColor="#2b2b2b";

//color changing
color.oninput = function colorChanger() {
  liveCellColor = this.value;
}

//make slider a default upon reload
slider.oninput = function defaultSlider() {
  speed = this.value;
  miliseconds.textContent = speed + "ms";
}
//pause and go button
function toggleGo(){
  going = !going;
  if(going){
    document.getElementById("pauseImg").style.display = 'inline';
    document.getElementById("goImg").style.display = 'none';
    loop = setInterval(generation, speed);
    //slider thing
    slider.oninput = function() {
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
    slider.oninput = function() {
      speed = this.value;
      miliseconds.textContent = speed + "ms";
    }
  }
}
//click cells to change status
function clickCells(event){
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      if(event.layerX > cell.x
        && event.layerX < cell.right
        && event.layerY > cell.y
        && event.layerY < cell.bottom){
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

//events
canvy.addEventListener("click", clickCells);
goButton.addEventListener("click", toggleGo);
stepButton.addEventListener("click", step);
restartButton.addEventListener("click", reset);
window.addEventListener("resize", resized);
