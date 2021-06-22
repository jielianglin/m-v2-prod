import React from "react";
import P5Mold from "../upload/annotation/P5Mold";
import Caption from "../upload/annotation/Caption";
import Tags from "../upload/annotation/Tags";

export default function WellBeingUpload() {

  return (
    <div className="wellBeingComponents">
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <P5Mold />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Caption />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tags />
      </div>

      <br />
    </div>
  );
}
