import React, { useState, useRef, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";

export default function FileInput(props) {

  const [text, showText] = useState(true);
  const [src, setSrc] = useState(null);
  const fileInput = useRef(null);

  const handleImageSelection = (event) => {
    //
    props.selectedImage(event.target.files[0]);
    //
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (src) {
      showText(false);
      props.showInputForms();

      console.log("showInputForms");
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
        // height: "400px",

        color: "black",
      }}
    >
      {text &&
        <Typography variant="h2" style={{ color: "#000000" }}>
          <div style={{ textAlign: "center", backgroundColor: "#FFFFFF", padding: "50px" }}>
            click
            <br />
            +
            <br />
            upload
          </div>
        </Typography>
      }
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <img
          style={{ maxWidth: "700px", height: "100%" }}
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