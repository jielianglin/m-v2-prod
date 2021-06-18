import React from "react";
import P5Lasso from "../upload/annotation/P5Lasso";
import P5LassoClassComp from "../upload/annotation/P5LassoClassComp";

import Caption from "../upload/annotation/Caption";
import Tags from "../upload/annotation/Tags";


export default function HomeUpload() {

  return (
    <div className="homeUploadComponents">
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <P5Lasso />
        {/*<P5LassoClassComp /> */}
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
