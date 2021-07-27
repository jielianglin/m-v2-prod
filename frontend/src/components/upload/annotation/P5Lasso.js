import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

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
    p5.createCanvas(300, 300).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);
    img = p5.loadImage(image, img => {
      p5.image(img, 0, 0);
    });

    clearButton = p5.createButton('Clear').style(
      'margin: 10px; width: 100px; height: 100px'
    )

    clearButton.mousePressed(resetSketch);
  }


  function draw(p5) {
    x = p5.lerp(x, p5.mouseX, smoothValue);
    y = p5.lerp(y, p5.mouseY, smoothValue);

    p5.image(img, 0, 0);

    if (p5.mouseIsPressed) {
      lasso();
    }
    p5.image(pg, 0, 0);
  }

  function lasso(p5) {
    pg.fill(color);
    pg.stroke(color);
    pg.strokeWeight(5);
    pg.ellipse(x, y, 30, 30);
    currentPath.push([x, y]);
    init = currentPath[0];
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
        <ColorSelector selectColor={color => setColor(color)} />
      </div>
    )
  } else {
    return (
      <FileInput selectImage={setImage} />
    );
  }
}