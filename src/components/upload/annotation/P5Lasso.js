import React, { useRef } from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

let cvs;
let penSize = 5;
let penState = 0;

let init;
var x, y, px, py;
var paths = [];
var currentPath = [];

let img;
let pg;
let path;


export default function P5Lasso() {
  const [color, setColor] = React.useState(['#ff0000']);
  const [src, setSrc] = React.useState(null);
  const fileInput = useRef(null);

  const handleImageSelection = (event) => {

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const openFileInput = () => {
    fileInput.current.click();
  };

  function setup(p5, canvasParentRef) {
    cvs = p5.createCanvas(600, 600).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);
    img = p5.loadImage(`${src}`);
  }

  function draw(p5) {
    x = p5.mouseX;
    y = p5.mouseY;
    px = p5.pmouseX;
    py = p5.pmouseY;

    p5.image(img, 0, 0, 300, 300)
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

  function mouseReleased(pg) {
    if (src !== null) {
      pg.line(x, y, ...init);
      currentPath = [];
      paths.push(currentPath);
    }
  }

  return (

    <div>
      <div>
        <button onClick={openFileInput}>upload</button>
        <img
          style={{ height: "100%" }}
          className="loaded-image"
          src={src}
          alt=""
        />
        <label>
          <input
            ref={fileInput}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
          />
        </label>
      </div>
      <div>
        <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} />
        <ColorSelector selectColor={color => setColor(color)} />
      </div>
    </div>

  );
}