import React from "react";
import UploadButtonSmall from "../../components/upload/uploadButton/UploadButtonSmall";
import Searchbar from "../../components/explore/Searchbar";
import Visual from "../../components/explore/Visual";
import Dashboard from "../../components/explore/Dashboard";




export default function ExploreMode() {

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
          padding: "10px 45px 10px 35px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "150px 150px 150px 150px",
          position: "absolute",
          zIndex: 2,
          width: "90%"
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

