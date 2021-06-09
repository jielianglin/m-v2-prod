import React from "react";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import UploadButton from "../../components/upload/uploadButton/UploadButton";
import Home from "./Home";
import Searchbar from "../../components/explore/Searchbar";
import Visual from "../../components/explore/Visual"; 




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
        <div className="row" style={{float: 'right', display:"flex", flexDirection:"row"}}>
         <Searchbar />
        </div>
        <div className="row" style={{float: 'left', display:"flex", flexDirection:"row"}}>
        <ExploreButton changeMode={changeMode} />
          <UploadButton />
          </div>
        <Visual/>

      </div>
    );
  }
}
