import React from "react";
import Sketch from "react-p5"; 

let file; 
let input;
let img;

export default function P5CreateFileInput() {

  function setup(p5) {
  input = p5.createFileInput(handleFile);
  input.position(0, 0);
}

function draw(p5) {
  p5.background(255);
  if (img) {
    p5.image(img, 0, 0, p5.width, p5.height);
  }
}

function handleFile(p5, file) {
  console.log(file);
  if (p5.file.type === 'image') {
    img = p5.createImg(p5.file.data, '');
  } else {
    img = null;
  }
}
  return (<div>
  <Sketch setup={setup} draw={draw}/>
  </div>);
}