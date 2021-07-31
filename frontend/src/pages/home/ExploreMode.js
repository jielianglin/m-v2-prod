import React from "react";
import ExploreButtonSmall from "../../components/explore/exploreButton/ExploreButtonSmall";
import UploadButtonSmall from "../../components/upload/uploadButton/UploadButtonSmall";
import Landing from "./Landing";
import Searchbar from "../../components/explore/Searchbar";
import Visual from "../../components/explore/Visual";




export default function ExploreMode() {
  const [exploreMode, galleryMode] = React.useState(false);

  const changeMode = () => {
    galleryMode(true);
  };

  if (exploreMode) {
    return <Landing />;
  } else {
    return (
      <div style={{ padding: "70px", borderRadius: "10px" }}>

        <div className="backgroundVisual"
          style={{
            borderRadius: "10px",
            position: "absolute",
            zIndex: 1,
            width: "90%",
            height: "90%"
          }}>
          <Visual />
        </div>
        <div className="controlBar"
          style={{
            padding: "10px 25px 10px 15px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
            position: "absolute",
            zIndex: 2,
            width: "90%"
          }}>
          <div className="row" style={{ float: 'right', display: "flex", flexDirection: "row" }}>
            <Searchbar />
          </div>
          <div className="row" style={{ float: 'left', display: "flex", flexDirection: "row" }}>
            <ExploreButtonSmall changeMode={changeMode} />
            <UploadButtonSmall />
          </div>
        </div>
      </div>
    );
  }
}
