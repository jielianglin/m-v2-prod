import { useState } from 'react';
import ReactLassoSelect, { getCanvas } from 'react-lasso-select';

export default function App () {
  const [src, setSrc]= useState("./sample/Sample.jpg"); 
  const [points, setPoints] = useState([]);
  const [clippedImg, setClippedImg] = useState();
  const [show, setShow] = useState(false); 
  
  
 return (
     <div>
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


   {/*<div>
    Points: {points.map(({x, y}) => `${x},${y}`).join(' ')}
    </div>*/}
        {show && <img src={clippedImg} alt="" />}
      </div>
  
  );}
