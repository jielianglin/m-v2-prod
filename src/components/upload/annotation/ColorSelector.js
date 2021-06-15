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

const colorsArr = colors.map((color, index) => (
  <div key={index}>
    {color}
  </div>
    )); 


export default function ColorSelector(props){
  const [color, setColor] = React.useState("#FFFFFF");

  const recordColor = (color, event) => {
    props.selectColor(color.hex);
    
    setColor(color.hex);
    console.log(color.hex);
  }

  const changeColor = (color) => {
    setColor(color.hex); 
    console.log(color.hex); 
  }


  return (
    <div>
      <br/>
    <div>
    <CirclePicker
    width="100%"
    colors={colors}
    color={color}
    circleSize={28}
    circleSpacing={10}
    onSwatchHover={recordColor}
    onClick={changeColor}
    />
    </div>
    <br/>
    </div>
  ); 
}