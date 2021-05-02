import React from "react";
import Button from "@material-ui/core/Button";
import ExploreIMG from "./exploreIMG/ExploreIMG.png";

export default function ExploreButton(props) {
  return (
    <Button>
      {" "}
      <img
        src={ExploreIMG}
        width="110px"
        onClick={() => {
          props.changeMode();
        }}
        alt="explore"
      />{" "}
    </Button>
  );
}
