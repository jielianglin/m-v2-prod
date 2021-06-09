import React, { useEffect } from "react";
import "./Home.css"; 

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import VisualPreview from "../../components/home/VisualPreview"; 
import UploadButton from "../../components/upload/uploadButton/UploadButton";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import ExploreMode from "./ExploreMode";
import IntroText from "../../components/home/IntroText";
import DesertVisualisation from "../../components/home/DesertVisualization"; 

import HomeIconText from "../../components/home/HomeIconText"; 
import SolidarityIconText from "../../components/home/SolidarityIconText";
import WellBeingIconText from "../../components/home/WellBeingIconText"; 

import HomeIconButton from "../../components/home/HomeIconButton";
import SolidarityIconButton from "../../components/home/SolidarityIconButton";
import WellBeingIconButton from "../../components/home/WellBeingIconButton";

import { useSpring, animated } from "react-spring";



const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    flexShrink: 1,
  },
}));

function shuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

export default function Gallery() {
  const classes = useStyles();
  const [galleryMode, exploreMode] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const [homeIcon, setHomeIconText] = React.useState(false);
  const [solidarityIcon, setSolidarityIconText] = React.useState(false);  
  const [wellBeingIcon, setWellBeingIconText] = React.useState(false); 
   
  const changeMode = () => {
  exploreMode(true);
  };

  const showHomeIconText = () => {
    setHomeIconText(true); 
  }

  const showSolidarityIconText = () => {
    setSolidarityIconText(true); 
  }

  const showWellBeingIconText = () => {
    setWellBeingIconText(true); 
  }

  const props = useSpring({
    opacity: toggle ? 1 : 0,
  });
  
  const items = [
      <UploadButton />,
      <VisualPreview/>,
      <HomeIconButton showHomeIconText={showHomeIconText}/> ,
      <SolidarityIconButton showSolidarityIconText={showSolidarityIconText}/>,
      <WellBeingIconButton showWellBeingIconText={showWellBeingIconText}/>,
      <VisualPreview/>,
      <VisualPreview/>,
      <ExploreButton changeMode={changeMode} />,
]; 

const row = items.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>{item}</Grid>
    </React.Fragment>
  ));

useEffect(() => {
const timer = setTimeout(() => { 
  setToggle(true); 
    console.log("activated_fade");
  setList(shuffle(row));
    console.log("mounted"); 
}, 8000);
return() => clearTimeout(timer);
}, []);
  
  if (galleryMode) {
    return <ExploreMode />;
  } else {
    if (homeIcon) {
      return <HomeIconText />; 
    } else {
      if (solidarityIcon) {
        return <SolidarityIconText />; 
      } else {
        if (wellBeingIcon) {
          return <WellBeingIconText />; 
        } else {
    return (
      <div > 
        
        <div className="desertVisualisation" style={{position: "absolute", zIndex: 1}}>
      <DesertVisualisation />
      </div>
      <div className="IntroText" style={{position:"absolute", zIndex: 2 }}>
          <IntroText/>
        </div>
      <div className="iconGallery" style={{position:"absolute", left:"20%", zIndex: "auto" }} >
        <br />
        <animated.div style={props}>
          <div className={classes.root}>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              maxWidth="800px"
              minWidth="100px"
              margin="0 auto"
            >
              <Grid
                container
                display="flex"
                flexDirection="column"
                justify="center"
                alignItems="center"
                spacing={10}
              >
                {list}
              </Grid>
            </Box>
          </div>
        </animated.div>
      </div>
      </div>
    );
  }
  }}}}
