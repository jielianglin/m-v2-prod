import React, {useEffect} from 'react';

import Typography from "@material-ui/core/Typography";
import { Transition } from "react-transition-group";
 

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
export default function IntroText(){
    const [mount, setMount] = React.useState(false);
    const [seconds, setSeconds] = React.useState(5);
  const foo = React.useRef();

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

return(<Intro in={mount} /> ); }
