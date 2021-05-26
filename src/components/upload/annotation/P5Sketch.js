import Sketch from 'react-p5';

let penSize = 2;
let penState = 0;

let colorPicker;
let height; 
let color; 

export default function Marker() {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600,600).parent(canvasParentRef);
        p5.background(225);
        colorPicker = p5.createColorPicker('#ed225d');
        colorPicker.position(0, height + 5);
    }

    const draw = p5 => {
       if(p5.mouseIsPressed) {
            if (penState === 0){
                p5.line(p5.mouseX, p5.mouseY,p5.pmouseX, p5.pmouseY);
            }
       }
       p5.strokeWeight(penSize);
       p5.stroke(colorPicker.color()); 
    }

return <Sketch setup={setup} draw={draw}/> 
}