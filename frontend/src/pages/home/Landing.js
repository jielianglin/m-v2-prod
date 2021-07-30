import React, { useEffect } from "react";
import "./Landing.css";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import ParticlesPreview from "../../components/landing/ParticlesPreview";
import UploadButton from "../../components/upload/uploadButton/UploadButton";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import ExploreMode from "./ExploreMode";
import IntroText from "../../components/landing/IntroText";
import DesertVisualisation from "../../components/landing/DesertVisualization";

import HomeIconText from "../../components/landing/HomeIconText";
import SolidarityIconText from "../../components/landing/SolidarityIconText";
import WellBeingIconText from "../../components/landing/WellBeingIconText";

import HomeIconButton from "../../components/landing/HomeIconButton";
import SolidarityIconButton from "../../components/landing/SolidarityIconButton";
import WellBeingIconButton from "../../components/landing/WellBeingIconButton";
import useIntro from "../../components/landing/SessionStorage";
import Image1 from "../../components/landing/images/Image1";
import Image2 from "../../components/landing/images/Image2";
import Image3 from "../../components/landing/images/Image3";

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
  const showAnimation = useIntro();
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
    <Image1 />,
    <HomeIconButton showHomeIconText={showHomeIconText} />,
    <SolidarityIconButton showSolidarityIconText={showSolidarityIconText} />,
    <WellBeingIconButton showWellBeingIconText={showWellBeingIconText} />,
    <Image2 />,
    <Image3 />,
    <ExploreButton changeMode={changeMode} />,
  ];

  const row = items.map((item, index) => (
    <React.Fragment key={index}>
      <Grid item>{item}</Grid>
    </React.Fragment>
  ));




  useEffect(() => {
    let seconds;
    if (showAnimation === true) {
      seconds = 8000
    } else {
      seconds = 0
    }

    const timer = setTimeout(() => {
      setToggle(true);
      console.log("activated_fade");
      setList(shuffle(row));
      console.log("mounted");
    }, seconds);
    return () => clearTimeout(timer);
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

            <div>

              {showAnimation ? (
                <div >
                  <div className="desertVisualisation" style={{ position: "absolute", zIndex: 1 }}>
                    <DesertVisualisation />
                  </div>
                  <div className="IntroText" style={{ position: "absolute", zIndex: 2 }}>
                    <br />
                    <IntroText />
                  </div>
                  <div className="iconGallery"
                    style={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-400px",
                      zIndex: 3
                    }} >
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
              ) :

                (<div>
                  <div className="desertVisualisation" style={{ position: "absolute", zIndex: 1 }}>
                    <DesertVisualisation />
                  </div>
                  <div className="iconGallery"
                    style={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-400px",
                      zIndex: 2
                    }} >
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
                )}
            </div>

          );
        }
      }
    }
  }
}
