import React, { useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import UploadButton from "../../components/upload/uploadButton/UploadButton";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import ExploreMode from "./ExploreMode";
import IntroText from "../../components/IntroText";

import { useSpring, animated } from "react-spring";

import testimage1 from "./testimage1/testimage1.png";
import testimage2 from "./testimage2/testimage2.png";
import testimage3 from "./testimage3/testimage3.png";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    flexShrink: 1,
  },
  paper: {
    padding: theme.spacing(8),
    textAlign: "center",
    backgroundColor: "#E5E5E5",
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
   
  const changeMode = () => {
  exploreMode(true);
  };

  const props = useSpring({
    opacity: toggle ? 1 : 0,
  });
  
  const items = [
      <UploadButton />,
      <Paper className={classes.paper} elevation={0} />,
      <img src={testimage2} alt="" width="110px" />,
      <Paper className={classes.paper} elevation={0} />,
      <img src={testimage1} alt="" width="110px" />,
      <Paper className={classes.paper} elevation={0} />,
      <img src={testimage3} alt="" width="110px" />,
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
    return (
      <div>
        <br />
        <IntroText/>
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
    );
  }
}
