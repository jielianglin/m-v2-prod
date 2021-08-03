import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';
import EraserIcon from './eraser/EraserIcon.png';
import Tags from './Tags';
import Caption from './Caption';

var smoothValue = 0.05;
var init;
var x = 0;
var y = 0;
var path = [];
var currentPath = [];
var img;
var pg;
var clearButton;
var imgWidth;
var imgHeight;


export default function P5Lasso() {
  const [color, setColor] = React.useState(['#ff0000']);
  const [image, setImage] = React.useState(null);

  function setup(p5, canvasParentRef) {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);
    p5.background('black');
    img = p5.loadImage(image, img => {
      p5.image(img, 0, 0);
    });


    clearButton = p5.createImg(`${EraserIcon}`).style(
      'margin: 10px; width: 50px; height: 50px'
    )
    clearButton.position(1175, 500);
    clearButton.mousePressed(resetSketch);
  }

  function draw(p5) {
    x = p5.lerp(x, p5.mouseX, smoothValue);
    y = p5.lerp(y, p5.mouseY, smoothValue);

    imgWidth = img.width;
    imgHeight = img.height;

    if (imgWidth > 0 && imgHeight > 0) {
      p5.resizeCanvas(imgWidth, imgHeight);
      if (imgWidth > 700) {
        p5.resizeCanvas(700, imgHeight);
      }
    }

    p5.image(img, 0, 0);

    if (p5.mouseIsPressed) {
      pg.fill(color);
      pg.stroke(color);
      pg.strokeWeight(1);
      pg.ellipse(x, y, 15, 15);
      currentPath.push([x, y]);
      init = currentPath[0];
    }
    p5.image(pg, 0, 0, imgWidth, imgHeight);
  }

  function mouseReleased(p5) {
    if (image) {
      pg.strokeWeight(15);
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
        <br />
        <div style={{ backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7", padding: "50px", maxWidth: "800px", height: "auto" }}>
          <Caption />
          {image && (

            <div>
              <br />
              <Sketch setup={setup} draw={draw}
                mouseReleased={mouseReleased}
              />
            </div>
          )}
          <br />
          <Tags />
        </div>
        <ColorSelector selectColor={color => setColor(color)} />

      </div>
    )
  } else {
    return (
      <FileInput selectImage={setImage} />
    );
  }
}