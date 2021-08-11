import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SolidarityUpload from './SolidarityUpload';
import UploadIMG from "../upload/uploadButton/uploadIMG/UploadIMG.png";

export default function SolidarityIconText() {
  const [solidarityTheme, setSolidarityUpload] = React.useState(false);

  const changeState = () => {
    setSolidarityUpload(true);
  }

  if (solidarityTheme) {
    return (
      <div className="solidarityUpload">
        <SolidarityUpload />
      </div>);
  } else {
    return (
      <div className="solidarity" >
        <Typography variant="h2" style={{ textAlign: "left", margin: "50px", backgroundColor: "#E6DAC8" }}> Solidarity </Typography>
        <div style={{ margin: "100px 200px 100px 200px" }}>
          <Typography>
            Acknowledging and celebrating different backgrounds, migration stories, and experiences,
            our search is to create a deeper understanding of one another, and to explore the presence
            of solidarity and the absence of judgment. Connection and empathy towards one another will be
            strengthened.
            <br />
            <br />
            The image dataset for “Solidarity” focuses on images related to strong and complex emotions.
            Users can respond to their pictures by mapping their emotions and sensations on to them, like painting.
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="homeUploadButton" onClick={changeState}>
            <img src={UploadIMG} width="110px" alt="" />
          </Button>
        </div>
      </div>
    );
  }
}