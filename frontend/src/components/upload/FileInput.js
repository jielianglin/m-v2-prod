import React, { useState, useRef, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";

var slider;
var diameter = 50;
var smoothValue = 0.05;
let img;
let pg;
var clearButton;
var x = 0;
var y = 0;
var imgWidth;
var imgHeight;


export default function FileInput(props) {

  const [src, setSrc] = useState(null);
  const fileInput = useRef(null);

  const handleImageSelection = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect((event) => {
    if (src) {
      props.selectImage(src);
    }
  }, [src]);

  const openFileInput = () => {
    fileInput.current.click();
  };

  return (
    <div
      className="image-input"
      onClick={openFileInput}
      style={{
        width: "100%",
        height: "400px",

        color: "black",
      }}

    >
      <Typography variant="h2" style={{ color: "#000000" }}>
        <div style={{ textAlign: "center", backgroundColor: "#E6DAC8", }}>
          <br />
          click
          <br />
          +
          <br />
          upload
        </div>
      </Typography>
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
  );
}