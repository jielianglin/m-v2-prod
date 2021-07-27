import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';
import EraserIcon from './eraser/eraserIcon/EraserIcon.png'

var smoothValue = 0.05;
var init;
var x = 0;
var y = 0;
var path = [];
var currentPath = [];
var img;
var pg;

var clearButton;


export default function P5Lasso() {
  const [color, setColor] = React.useState(['#ff0000']);
  const [image, setImage] = React.useState(null);

  function setup(p5, canvasParentRef) {
    p5.createCanvas(300, 600).parent(canvasParentRef);
    p5.background('black');
    pg = p5.createGraphics(300, 600);
    img = p5.loadImage(image, img => {
      p5.image(img, 0, 0);
    });

    clearButton = p5.createImg(`${EraserIcon}`).style(
      'margin: 10px; width: 50px; height: 50px'
    )
    clearButton.position(200, 200);
    clearButton.mousePressed(resetSketch);
  }

  function draw(p5) {
    x = p5.lerp(x, p5.mouseX, smoothValue);
    y = p5.lerp(y, p5.mouseY, smoothValue);

    p5.image(img, 0, 0);

    if (p5.mouseIsPressed) {
      pg.fill(color);
      pg.stroke(color);
      pg.strokeWeight(5);
      pg.ellipse(x, y, 30, 30);
      currentPath.push([x, y]);
      init = currentPath[0];
    }
    p5.image(pg, 0, 0);
  }

  function mouseReleased(p5) {
    if (image) {
      pg.strokeWeight(35);
      pg.line(x, y, ...init);
      currentPath = [];
      path.push(currentPath);
    }
  }

  function resetSketch(p5) {
    pg.clear();
  }

  if (image) {
    return (

      <div>
        {image && (
          <div>
            <Sketch setup={setup} draw={draw}
              mouseReleased={mouseReleased}
            />
          </div>
        )}
        <br />
        <ColorSelector selectColor={color => setColor(color)} />
      </div>
    )
  } else {
    return (
      <FileInput selectImage={setImage} />
    );
  }
}