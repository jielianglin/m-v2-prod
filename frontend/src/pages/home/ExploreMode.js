import React from "react";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import UploadButton from "../../components/upload/uploadButton/UploadButton";
import Home from "./Home";
import Searchbar from "../../components/explore/Searchbar";

export default function ExploreMode() {
  const [exploreMode, galleryMode] = React.useState(false);

  const changeMode = () => {
    galleryMode(true);
  };

  if (exploreMode) {
    return <Home />;
  } else {
    return (
      <div style={{ padding: "50px" }}>
        {" "}
        <UploadButton />
        <ExploreButton changeMode={changeMode} />
        <div className="search" style={{ float: "right" }}>
          <Searchbar />
        </div>
      </div>
    );
  }
}
