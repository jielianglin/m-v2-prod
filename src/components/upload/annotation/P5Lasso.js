import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';
import p5 from 'p5';

let cvs;
let penSize = 5;
let penState = 0;

let init;
var x, y, px, py;
var paths = [];
var currentPath = [];

let img;
let pg;



export default function P5Lasso() {
  const [color, setColor] = React.useState(['#ff0000']);
  const [image, setImage] = React.useState(null);


  function setup(p5, canvasParentRef) {
    cvs = p5.createCanvas(600, 600).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);
    img = p5.loadImage(image, img => {
      p5.image(img, 0, 0);
    });
  }

  function draw(p5) {
    x = p5.mouseX;
    y = p5.mouseY;
    px = p5.pmouseX;
    py = p5.pmouseY;


    p5.image(img, 0, 0);
    pg.strokeWeight(penSize);

    if (p5.mouseIsPressed) {
      if (penState === 0) {
        console.log(color);
        pg.stroke(color);

        pg.line(x, y, px, py);
        currentPath.push([x, y]);
        init = currentPath[0];
        console.log(init);
      }
    }
    p5.image(pg, 0, 0);
    console.log('graphics renderer');
  }

  function mouseReleased(p5) {
    if (image) {
      pg.line(x, y, ...init);
      currentPath = [];
      paths.push(currentPath);
    }
  }

  if (image) {
    return (

      <div>
        {image && (
          <div>
            <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} />
          </div>
        )}
        <ColorSelector selectColor={color => setColor(color)} />
      </div>
    )
  } else {
    return (
      <FileInput selectImage={setImage} />
    );
  }
}