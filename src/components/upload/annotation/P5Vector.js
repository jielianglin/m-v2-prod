import Sketch from 'react-p5';

let init; 
var x, y, px, py;
var coords = []; 

export default function Vector(){

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600,600).parent(canvasParentRef);
              p5.background(225);       
    }

    const draw = p5 => {
        x = p5.mouseX;
        y = p5.mouseY;
        px = p5.pmouseX;
        py = p5.pmouseY;

        if (p5.mouseIsPressed){
            p5.strokeWeight(10); 
            p5.stroke('red'); 
            p5.line(x, y, px, py); 
            coords.push([x, y]); 
            init = coords[0]; 
            console.log(init);
        }
    }

    const mouseReleased = p5 => { 
        p5.line(x, y, ...init); 
    }

     return <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased}/>  
    }