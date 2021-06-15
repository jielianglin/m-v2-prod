import React from 'react'; 
import Sketch from 'react-p5';

let cvs; 
let penSize = 5;
let penState = 0;

let init; 
var x, y, px, py;
var paths = [];
var currentPath = [];

let img; 
let pg; 

let c; 

let input; 

export default function Vector(){

    const setup = (p5, canvasParentRef) => {
        cvs = p5.createCanvas(600, 600).parent(canvasParentRef);
        
        pg = p5.createGraphics(400, 400);
        pg.position =(0, 300)
        
    }

    const draw = p5 => {
        x = p5.mouseX;
        y = p5.mouseY;
        px = p5.pmouseX;
        py = p5.pmouseY;

        
        p5.background(255);
        input = p5.createFileInput(handleFile);
        input.position(p5.width/2, p5.height/2); 
        if (img) {
            p5.image(img, 0, 0, p5.width/2, p5.height/2); 
        }
        pg.strokeWeight(penSize); 
    
        
            if (p5.mouseIsPressed){
                    if (penState === 0){
                    pg.stroke(c); 
                    pg.line(x, y, px, py);
                    currentPath.push([x, y]); 
                    init = currentPath[0]; 
                    console.log(init);
                }
            }
            p5.image(pg, 0, 300);
    }

    const mouseReleased = () => { 
        pg.line(x, y, ...init); 
        currentPath = []; 
        paths.push(currentPath); 
    }

    const handleFile = (p5, file) => {
        p5.print(file);
        if (file.type === 'image') {
            img = p5.createImg(file.data, '');
            img.hide();
        } else {
            img = null; 
        }
    }

     return (
       <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} handleFile={handleFile}/> 
       ); 
    }