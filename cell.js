//cells on the board
class Cell{

  static deadColor = "grey";
  static aliveColor = "red";

  constructor(x,y,isAlive){
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
  }

  draw(){
    drawRect(this.x,this.y,20,20,"red");
  }



}
