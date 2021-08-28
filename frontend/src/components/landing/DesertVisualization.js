import React from 'react';
import Sketch from 'react-p5';

var t;

// var alpha = [5, 7, 18, 19];



export default function DesertVisualization() {

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background("#E6DAC8")
    // var alpha_value = alpha[Math.floor(Math.random() * alpha.length)];
    // console.log(alpha_value);
    // p5.stroke(230, 218, 200, 90);
    // p5.fill(230, 218, 200, alpha_value);
    p5.stroke(255, 250, 250, 20);
    p5.fill(255, 250, 250, 2)
    t = 0;
  }

  const draw = p5 => {

    // var x1 = p5.width * p5.noise(t + 15);
    // var x2 = p5.width * p5.noise(t + 25);
    // var x3 = p5.width * p5.noise(t + 35);
    // var x4 = p5.width * p5.noise(t + 45);
    // var y1 = p5.height * p5.noise(t + 55);
    // var y2 = p5.height * p5.noise(t + 65);
    // var y3 = p5.height * p5.noise(t + 75);
    // var y4 = p5.height * p5.noise(t + 85);


    var x1 = p5.width * p5.noise(t + 25);
    var x2 = p5.width * p5.noise(t + 30);
    var x3 = p5.width * p5.noise(t + 35);
    var x4 = p5.width * p5.noise(t + 40);
    var y1 = p5.height * p5.noise(t + 45);
    var y2 = p5.height * p5.noise(t + 50);
    var y3 = p5.height * p5.noise(t + 55);
    var y4 = p5.height * p5.noise(t + 60);


    p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);

    t += 0.002;

    // clear the background every 500 frames using mod (%) operator
    if (p5.frameCount % 400 === 0) {
      p5.noLoop();
    }
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  )

}