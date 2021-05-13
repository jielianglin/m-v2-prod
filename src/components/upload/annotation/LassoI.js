import { useState } from 'react';
import ReactLassoSelect, { getCanvas } from 'react-lasso-select';
import Sample from "./sample/Sample.jpg"

export default function App () {
  const [src, setSrc]= useState(`${Sample}`); 
  const [points, setPoints] = useState([]);
  const [clippedImg, setClippedImg] = useState();
  const [show, setShow] = useState(false); 
  
  
 return (
     <div style={{margin: "0 auto"}}>

<ReactLassoSelect
        value={points}
        src={src}
        onChange={value => {
          setPoints(value);
        }}
        onComplete={value => {
          if (!value.length) return;
          getCanvas(src, value, (err, canvas) => {
            if (!err) {
              setClippedImg(canvas.toDataURL()); 
              setShow(true);
              setSrc(null); 
            }
          });
        }}
      />
        {show && <img src={clippedImg} alt="" />}
      </div>
  
  );}
