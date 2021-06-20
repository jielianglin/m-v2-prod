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
      <div className="solidarity">
        <Typography variant="h2" style={{ textAlign: "center" }}> Solidarity </Typography>

        <Typography style={{ margin: "50px" }}>
          Under the topic solidarity, the connection and empathy towards one another will be strengthened. Acknowledging the different backgrounds, migration stories and experiences, the search is to create a deeper understanding of one another and explore the presence of solidarity and the absence of judgment.
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="homeUploadButton" onClick={changeState}>
            <img src={UploadIMG} width="110px" alt="" />
          </Button>
        </div>
      </div>
    );
  }
}