import React from "react";
import UploadButtonSmall from "../../components/upload/uploadButton/UploadButtonSmall";
import Searchbar from "../../components/explore/Searchbar";
import Visual from "../../components/explore/Visual";
import Dashboard from "../../components/explore/Dashboard";




export default function ExploreMode() {

  return (
    <div style={{
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "auto",
      padding: "30px 10px 0px 10px",
      backgroundColor: "#E6DAC8",
      // borderRadius: "0px"

    }}>

      <div className="backgroundVisual"
        style={{
          zIndex: 2,
          width: "99%",
          height: "auto",
          backgroundColor: "#E6DAC8",
        }}>
        <Visual />
      </div>
      <div className="controlBar"
        style={{
          position: "relative",
          right: "5px",
          zIndex: 3,
          backgroundColor: "#E6DAC8",
          // backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: "100%",
          height: "20px"
        }}>
        <div className="row" style={{ float: 'right', display: "flex", flexDirection: "row" }}>
          <Searchbar />
        </div>
        <div className="row" style={{ float: 'left', display: "flex", flexDirection: "row" }}>
          <UploadButtonSmall />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

