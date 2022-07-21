
var canvy = document.getElementById('game');
var goButton = document.getElementById("pauseGoButton")
var WAIT_TIME = 300
var going = true
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
          cell.draw();
        }
    }
  }
}

function toggleGo(){
  going = !going
  if(going){
    document.getElementById("pauseImg").style.display = 'inline'
    document.getElementById("goImg").style.display = 'none'
    loop = setInterval(generation,WAIT_TIME);
  } else {
    clearInterval(loop)
    document.getElementById("pauseImg").style.display = 'none'
    document.getElementById("goImg").style.display = 'inline'
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
      cell.draw();
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
var gen = 0;
function generation(){
  checkNeighbors();
  changeState();
  //draw updated grid
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < columns; i++){
      var cell = grid[j][i];
      cell.draw();
    }
  }
  gen++;
}
//i love you beck
//events
canvy.addEventListener("click", clickCells);
goButton.addEventListener("click", toggleGo);
var loop = setInterval(generation,WAIT_TIME);
