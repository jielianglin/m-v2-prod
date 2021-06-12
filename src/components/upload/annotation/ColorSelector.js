import React from 'react'; 
import Sketch from 'react-p5'; 

let c = "black"; 
let cnv; 

export default function ColorSelector(props){

const setup = (p5, canvasParentRef) => {
cnv = p5.createCanvas(100, 20);
cnv.position(300, 150); 
p5.background(205);
}

const draw = p5 => {
  if (p5.mouseIsPressed) {
	p5.stroke(c);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  }
        p5.noStroke();
        p5.fill("red");
        p5.ellipse(0, 10, 20);
        c = "red";

        p5.noStroke(); 
        p5.fill("blue");
        p5.ellipse(40, 10, 20);
        c="blue"; 

        if (p5.mouseIsPressed) {
  if (p5.mouseX > 0 && p5.mouseX < 10 && p5.mouseY > 0 && p5.mouseY < 10) {
    //set the variables to random values
    c = "red";
  }
  if (p5.mouseX > 0 && p5.mouseX < 80 && p5.mouseY > 0 && p5.mouseY < 10) {
    //set the variables to random values
    c = "blue";
  }
}
}

return <Sketch setup={setup} draw ={draw} />
    


}
