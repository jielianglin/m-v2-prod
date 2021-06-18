import React, { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
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
        border: "2px solid",
        borderRadius: "5px",
        color: "black",

      }}

    >
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