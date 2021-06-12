import React from 'react'; 
import Sketch from 'react-p5';

var r; 
var img; 

export default function P5Mold(props){


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(1200,600).parent(canvasParentRef);
        img = p5.loadImage(`${props.image}`); 
        
        r = p5.width * 0.10;
        p5.noStroke();  
        p5.fill(30);
        p5.translate(p5.width/2, p5.height/2); 
            p5.beginShape();
            p5.vertex(0, -r);
                p5.quadraticVertex(r, -r, r, 0); 
                p5.quadraticVertex(r, r, 0, r); 
                p5.quadraticVertex(-r, r, -r, 0);
                p5.quadraticVertex(-r, -r, 0, -r);
            p5.endShape();
    }

    const draw = p5 => {
        p5.background(225);
        p5.translate(p5.width/2, p5.height/2); 
        
        p5.push();
        p5.scale(p5.mouseX/100, p5.mouseY/100);
        
        p5.translate(p5.width/2, p5.height/2); 
        p5.beginShape();
            p5.vertex(0, -r);
                p5.quadraticVertex(r, -r, r, 0); 
                p5.quadraticVertex(r, r, 0, r); 
                p5.quadraticVertex(-r, r, -r, 0);
                p5.quadraticVertex(-r, -r, 0, -r);
            p5.endShape();
    }

     return <Sketch setup={setup} draw={draw}/>  
    }