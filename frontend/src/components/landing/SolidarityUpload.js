import React from "react";
import P5Mask from "../upload/annotation/P5Mask";
import Caption from "../upload/annotation/Caption";
import Tags from "../upload/annotation/Tags";


export default function SolidarityUpload() {

  return (
    <div className="solidarityUploadComponents">
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <P5Mask />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Caption />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tags />
        <br />
      </div>
    </div>
  );
}
