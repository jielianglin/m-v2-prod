import React, { useState, useRef, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";

export default function FileInput(props) {

  const [src, setSrc] = useState(null);
  const fileInput = useRef(null);

  const handleImageSelection = (event) => {
    props.selectedImage(event.target.files[0]);

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (src) {
      //select image for canvas
      props.selectImage(src);

      // props.showInputForms();
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
      <Typography variant="h2" style={{ color: "#2B4466" }}>
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