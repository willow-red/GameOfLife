//cells on the board
class Cell{

  static SIZE = 20;

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

  draw(){
    if(this.isAlive == true){
      drawRect(this.x,this.y,Cell.SIZE,Cell.SIZE, "#e60b0b");
    }
    else{
      drawRect(this.x,this.y,Cell.SIZE,Cell.SIZE, "#212121");
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
