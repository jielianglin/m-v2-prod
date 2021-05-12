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

  const [mount, setMount] = React.useState(false);
  const [seconds, setSeconds] = React.useState(5);
  const foo = React.useRef();
  
  
  const [list, setList] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const [count, setCount] = React.useState(0); 
  const fooTwo = React.useRef(); 
   
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
  function counter() {
setCount((count) => count + 1);
  }
  fooTwo.current = setInterval(() => counter(), 1000); 
  if (count === 20) {
    setToggle(true); 
    clearInterval(fooTwo.current);
       const mountArray = shuffle(row);
       setList(mountArray);}     
  }, [count]);

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

  if (galleryMode) {
    return <ExploreMode />;
  } else {
    return (
      <div>
        <br />
        <Intro in={mount} />
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
