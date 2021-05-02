import React from "react";
import * as markerjs2 from "markerjs2";

export default function Annotator() {
  const [src, setSrc] = React.useState(null);
  const imgRef = React.useRef(null);

  const handleImageSelection = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const openFileInput = () => {
    imgRef.current?.click();
  };

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      // create a marker.js MarkerArea
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      // attach an event handler to assign annotated image back to our image element
      markerArea.addRenderEventListener((dataUrl) => {
        if (imgRef.current) {
          imgRef.current.src = dataUrl;
        }
      });
      // launch marker.js
      markerArea.show();
    }
  };

  return (
    <div
      className="image-input"
      style={{
        width: "100%",
        height: "200px",
        border: "2px solid",
        borderRadius: "5px",
        color: " #9611ff",
      }}
      onClick={openFileInput}
    >
      <img
        ref={imgRef}
        src={src}
        alt="upload_image"
        style={{ height: "100%" }}
        onClick={showMarkerArea}
      />

      <label>
        <input
          ref={imgRef}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleImageSelection}
        />
      </label>
    </div>
  );
}
