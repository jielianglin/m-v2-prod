
import Sketch from 'react-p5';

let x, y, px, py; 

export default function Vector(){


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600,600).parent(canvasParentRef);
        p5.background(225);  
        
    }
    
    
    const mouseDragged = p5 => {
        x = p5.mouseX;
        y = p5.mouseY;
        px = p5.pmouseX;
        py = p5.pmouseY;
        p5.strokeWeight(10);
        p5.line(x,y,px,py);
    }
    
    const mouseReleased = p5 => {
        p5.strokeWeight(0);
        p5.ellipse(x, y, 15);  
    }

    return <Sketch 
    setup={setup}  
    mouseDragged={mouseDragged} 
    mouseReleased={mouseReleased} />
}