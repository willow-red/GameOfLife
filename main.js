console.log("hello world");

var button = document.getElementById('goButton');
var ily="";
var paragraph = document.getElementById('input');
var color = ["red", "blue", "yellow", "pink", "orange"];
var i = 0;

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

//events
button.addEventListener("click", buttonClick);
