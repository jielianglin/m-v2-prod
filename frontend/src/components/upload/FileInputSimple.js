import React, { useState, useRef, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";

export default function FileInput(props) {

  const [src, setSrc] = useState(null);
  const [text, showImage] = useState(true);
  const fileInput = useRef(null);

  const handleImageSelection = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (src) {
      props.showInputForms();
      showImage(false);
    }
  }, [src]);

  const openFileInput = () => {
    fileInput.current.click();
  };

  return (
    <div
      className="image-input"
      onClick={openFileInput}
    >
      {text &&
        <div
          style={{
            width: "100%",
            maxHeight: "400px",
          }}>

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
        </div>
      }
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <img
          style={{ height: "100%" }}
          className="loaded-image"
          src={src}
          alt=""
        />
      </div>
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