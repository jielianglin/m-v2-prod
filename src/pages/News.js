import React from "react";
import Sketch from "react-p5"; 

let file; 
let input;
let img;

export default function News() {

  function setup(p5) {
  input = p5.createFileInput(handleFile);
  input.p5.position(0, 0);
}

function draw(p5) {
  p5.background(255);
  if (img) {
    p5.image(img, 0, 0, p5.width, p5.height);
  }
}

function handleFile(p5, file) {
  console.log(file);
  if (file.type === 'image') {
    img = p5.createImg(file.data, '');
    img.p5.hide();
  } else {
    img = null;
  }
}
  return (<div>
  <Sketch setup={setup} draw={draw}/>
  </div>);
}
