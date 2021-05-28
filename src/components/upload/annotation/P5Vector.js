
import Sketch from 'react-p5';


export default function Vector(){
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600,600).parent(canvasParentRef);
        p5.background(225);  
    }
    
    const draw = p5 => {
        if(p5.mouseIsPressed){
            p5.beginShape();
            console.log(p5.mouseX, p5.mouseY);
            p5.line(p5.pmouseX, p5.pmouseY,p5.mouseX,p5.mouseY );
            p5.strokeWeight(5);
            p5.endShape(); 
        }
       
    }
    
    const mouseReleased = p5 => {
        p5.strokeWeight(0);
        p5.ellipse(p5.mouseX, p5.mouseY, 15);
        
    }
    return <Sketch setup={setup}  draw={draw} mouseReleased={mouseReleased}/> 
}
    

    

    