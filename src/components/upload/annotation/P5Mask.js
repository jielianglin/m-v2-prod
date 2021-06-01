import Sketch from 'react-p5';
import Sample from './sample/Sample.jpg';

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
       pg.fill(colorPicker.color())
       pg.stroke(colorPicker.color());
       if(p5.mouseIsPressed) {   
                    pg.ellipse(p5.mouseX, p5.mouseY, 25);
        }
        
        p5.image(pg, 0, 0);
    }


return <Sketch preload={preload} setup={setup} draw={draw} /> 
}