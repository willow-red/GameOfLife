//cells on the board
class Cell{

  constructor(x,y,isAlive){
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
  }

  draw(){
    if(this.isAlive == true){
      drawRect(this.x,this.y,20,20, "red");
    }
    else{
      drawRect(this.x,this.y,20,20, "grey");
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
