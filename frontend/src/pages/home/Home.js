import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import UploadButton from "../../components/upload/uploadButton/UploadButton";
import ExploreButton from "../../components/explore/exploreButton/ExploreButton";
import ExploreMode from "./ExploreMode";
import { useSpring, animated } from "react-spring";

import { Transition } from "react-transition-group";
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

const Intro = ({ in: inProp }) => (
  <Transition in={inProp} timeout={{ enter: 500, exit: 500 }}>
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          textAlign: "center",
        }}
      >
        <Typography>
          <i>
            What is essential is invisible to the eye. -Antoine St. Exupery
            (1943)
          </i>
        </Typography>
      </div>
    )}
  </Transition>
);

const defaultStyle = {
  transition: `transform 5000ms, opacity 5000ms ease`,
  opacity: 1,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function Gallery() {
  const classes = useStyles();
  const [galleryMode, exploreMode] = React.useState(false);
  const [displayShuffle, setDisplayShuffle] = React.useState([]);
  const [mount, setMount] = React.useState(false);
  const [seconds, setSeconds] = React.useState(5);
  const foo = React.useRef();
  const [isToggled, setToggle] = React.useState(false);

  const fade = useSpring({
    opacity: isToggled ? 0 : 1,
  });

  const changeMode = () => {
    exploreMode(true);
  };

  useEffect(() => {
    setMount(true);
    function tick() {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
    foo.current = setInterval(() => tick(), 1000);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(foo.current);
      setMount(false);
    }
  }, [seconds]);

  var shuffle = require("shuffle-array"),
    items = [
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

  const animateItems = React.useCallback(() => {
    setToggle(!isToggled);
    setDisplayShuffle(shuffle(row));
  }, [shuffle, row, isToggled]);

  useEffect(() => {
    console.log("firstrender");
    const timer = setInterval(animateItems, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [animateItems]);

  if (galleryMode) {
    return <ExploreMode />;
  } else {
    return (
      <div>
        <br />
        <Intro in={mount} />
        <animated.div style={fade}>
          <div className={classes.root}>
            <Box
              display="flex"
              flexdirection="row"
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
                {displayShuffle}
              </Grid>
            </Box>
          </div>
        </animated.div>
      </div>
    );
  }
}
