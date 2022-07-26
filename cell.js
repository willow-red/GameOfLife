//cells on the board
class Cell{

  static SIZE = 10;

  constructor(x,y,isAlive){
    this.x = x; //also left side of square
    this.y = y; //also top of square
    this.isAlive = isAlive;
    //right side edge of square
    this.right = x+Cell.SIZE;
    //bottom edge of square
    this.bottom = y+Cell.SIZE;
    this.neighbors = 0;
  }
  //custom colors can be input
  draw(aliveCellColor, deadCellColor){
    if(this.isAlive == true){
      drawRect(this.x,this.y,Cell.SIZE,Cell.SIZE, aliveCellColor);
    }
    else{
      drawRect(this.x,this.y,Cell.SIZE,Cell.SIZE, deadCellColor);
    }
  }

  changeAlive(){
    //switch from false to true
    if(this.isAlive == false){
      this.isAlive = true;
    }
    else{
      this.isAlive = false;
    }
  }


}
