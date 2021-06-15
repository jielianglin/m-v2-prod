import React from 'react';
import { CirclePicker } from 'react-color';

let colors = [
"#f44336", 
"#e91e63", 
"#9c27b0", 
"#673ab7", 
"#3f51b5", 
"#2196f3", 
"#03a9f4", 
"#00bcd4", 
"#009688", 
"#4caf50", 
"#8bc34a", 
"#cddc39", 
"#ffeb3b", 
"#ffc107", 
"#ff9800", 
"#ff5722", 
"#795548", 
"#607d8b"];

export default function ColorSelector(){
  return (
    <div>
      <br/>
    <div>
    <CirclePicker
    width="100%"
    colors={colors}
    circleSize={28}
    circleSpacing={10}
    onSwatchHover={ () => console.log()}
    />
    </div>
    </div>
  ); 
}