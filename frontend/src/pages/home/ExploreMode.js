import React from "react";
import UploadButtonSmall from "../../components/upload/uploadButton/UploadButtonSmall";
import Searchbar from "../../components/explore/Searchbar";
import Visual from "../../components/explore/Visual";
import Dashboard from "../../components/explore/Dashboard";

import Echarts from "../../components/explore/Echarts";


export default function ExploreMode() {

  return (
    <div style={{
      position: "absolute",
      zIndex: 0,
      width: "100%",
      height: "auto",
      padding: "30px 10px 0px 10px",
      backgroundColor: "#E6DAC8",
      // borderRadius: "0px"
    }}>

      <div className="backgroundVisual"
        style={{
          zIndex: 1,
          width: "99%",
          height: "auto",
          backgroundColor: "#E6DAC8",
          position: "relative",
        }}>
        <Visual />
      </div>

      {/* <div className="backgroundVisual"
        style={{
          zIndex: 2,
          width: "99%",
          height: "auto",
          backgroundColor: "#E6DAC8",
        }}>
        <Echarts />
      </div> */}

      <div className="controlBar"
        style={{
          // position: "relative",
          // right: "5px",
          zIndex: 3,
          // backgroundColor: "#E6DAC8",
          // backgroundColor: "rgba(255, 255, 255, 0.5)",
          // width: "100%",
          // height: "20px"
        }}>
        <div className="row" style={{ justifyContent: "center", display: "flex", flexDirection: "row" }}>
          <Searchbar />
        </div>
        <br />
        <div className="row" style={{ display: "flex", flexDirection: "row", justifyContent: "center", position: "relative", left: "-5px" }}>

          <div style={{}}>
            <Dashboard />
          </div>

          <div style={{ position: "relative", top: "-5px" }}>
            <UploadButtonSmall />
          </div>
        </div>
      </div>
    </div>
  );
}

