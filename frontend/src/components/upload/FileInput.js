import React, { useState, useRef, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";


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
        color: "black",
        borderRadius: "3px",
        boxShadow: "3px 3px 3px #b4beb7",
        padding: "50px",
        backgroundColor: "#FFFFFF"
      }}

    >
      <Typography variant="h2" style={{ color: "#000000" }}>
        <div style={{ textAlign: "center", backgroundColor: "#FFFFFF", padding: "50px 50px 50px 50px" }}>
          <br />
          click
          <br />
          +
          <br />
          upload
          <br />
          <br />
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