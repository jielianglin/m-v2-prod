import React from "react";
import P5Lasso from "../upload/annotation/P5Lasso";
import Caption from "../upload/annotation/Caption";
import Tags from "../upload/annotation/Tags";


export default function HomeUpload() {

  return (
    <div className="homeUploadComponents">
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <P5Lasso />
      </div>

      <br />
    </div>
  );
}
