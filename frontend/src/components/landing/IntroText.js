import React, { useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import { Transition } from "react-transition-group";
// import DesertVisualization from "./DesertVisualization";


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

let questions = [
  "Can transforming AI practices be a healing process?",
  "How is the way we perceive the world changing due to image recognition?",
  "Who are the AI labourers, and where are they?",
  "Can everyday users collaberate on AI?",
  "What do we sacrifice for automation?",
  "What creates AI bias, and who is affected?",
  "Can underrepresented peoples have a voice in the future media landscape?",
  "How can we build inclusive technologies?",
  "How can we source data ethnically?",
  "How do AI technologies impact migration flows? What are digital borders?"
]

const intro = questions.map((item, index) => (
  <div key={index}>
    {item}
  </div>
));

const randomQuestion = intro[Math.floor(Math.random() * intro.length)];

const Intro = ({ in: inProp }) => (
  <Transition in={inProp} timeout={{ enter: 500, exit: 500 }}>
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          textAlign: "center",
          padding: "50px"
        }}
      >
        <Typography variant='h2'>
          {randomQuestion}
        </Typography>
      </div>
    )}
  </Transition>
);
export default function IntroText() {
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

  return (
    <div>

      {/* <DesertVisualization style={{ zIndex: 2 }} /> */}
      <Intro in={mount} style={{ zIndex: 1 }} />

    </div>
  );
}
