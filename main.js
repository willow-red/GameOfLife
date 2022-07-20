console.log("hello world");

var button = document.getElementById('goButton');
var ily="";
var paragraph = document.getElementById('input');
var color = ["red", "blue", "yellow", "pink", "orange"];
var i = 0;
var canvy = document.getElementById('game');

//color changing inputs
function buttonClick(){
  ily = window.prompt("What do you want to type?");
  console.log(ily);
  paragraph.textContent = ily;
  paragraph.style.color = color[i];
  i++;
  if(i>=color.length){
    i = 0;
  }
}
function canvasClick(event){
  var cel = new Cell(event.layerX, event.layerY, true);
  if(event.buttons == 1){
    cel.draw();
  }

}

//events
canvy.addEventListener("mousemove", canvasClick);
button.addEventListener("click", buttonClick);
