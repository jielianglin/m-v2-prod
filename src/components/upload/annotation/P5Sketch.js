import Sketch from 'react-p5';
import Sample from './sample/Sample.jpg';

let penSize = 2;
let penState = 0;

let colorPicker;
let height; 
let color;

let img; 
let pg; 

export default function Marker() {
    
    const preload = p5 => {
    img = p5.loadImage(`${Sample}`);
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600,600).parent(canvasParentRef);
        pg = p5.createGraphics(600, 600); 
        colorPicker = p5.createColorPicker('#ed225d');
        colorPicker.position(0, height + 5);
    }



    const draw = p5 => {
       p5.image(img, 0, 0);
       pg.strokeWeight(penSize);
       pg.stroke(colorPicker.color());
       if(p5.mouseIsPressed) {
                if (penState === 0){
                    pg.line(p5.mouseX, p5.mouseY,p5.pmouseX, p5.pmouseY);
                }
        }
        
        p5.image(pg, 0, 0);
    }


return <Sketch preload={preload} setup={setup} draw={draw} /> 
}