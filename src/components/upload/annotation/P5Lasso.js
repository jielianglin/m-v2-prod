import React from 'react'; 
import Sketch from 'react-p5';
import ColorSelector from "./ColorSelector"; 

import Sample from './sample/Sample.jpg';

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
export default function Vector(){

    const preload = p5 => {
    img = p5.loadImage(`${Sample}`);
    }

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


        p5.image(img, 0, 100);
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

     return <Sketch preload={preload} setup={setup} draw={draw} mouseReleased={mouseReleased}/>  
    }