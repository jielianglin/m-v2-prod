import { useState, useRef } from 'react';
import ReactLassoSelect, { getCanvas } from 'react-lasso-select';

export default function LassoI() { 
  const [src, setSrc]= useState(null); 
  const [points, setPoints] = useState([]);
  const [clippedImg, setClippedImg] = useState();
  const [show, setShow] = useState(false);
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
    fileInput.current?.click();
  };


 return (
     <div style={{margin: "0 auto"}}>

<button onClick={openFileInput}>
Choose image
      <label>
        <input
          ref={fileInput}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleImageSelection}
        />
      </label>
    </button>


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
