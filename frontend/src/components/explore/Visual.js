import React from 'react';
import Particles from 'react-particles-js';
import Echarts from './Echarts';
import './Visual.css';

class Visual extends React.Component {
  render() {
    return (
      <div>
        <div className="particles" style={{
          borderRadius: "10px",
          backgroundColor: "black",
          // zIndex: -1
        }}>
          <Particles
            params={{
              particles: {
                number: {
                  value: 355,
                  density: {
                    enable: true,
                    value_area: 1803.4120608655228
                  }
                },
                color: {
                  value: "#FFFFFF",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "black"
                  },
                  polygon: {
                    nb_sides: 4
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.48927153781200905,
                  random: false,
                  anim: {
                    enable: true,
                    speed: .2,
                    opacity_min: 0.2,
                    sync: true
                  }
                },
                size: {
                  value: 2,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: "black",
                  opacity: 0.3687847739990702,
                  width: 0.6413648243462091
                },
                move: {
                  enable: true,
                  speed: .001,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "window",
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble"
                  },
                  onclick: {
                    enable: true,
                    mode: "bubble"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 400,
                    line_linked: {
                      opacity: 1
                    }
                  },
                  bubble: {
                    distance: 83.91608391608392,
                    size: 1,
                    duration: 3,
                    opacity: 1,
                    speed: 3
                  },
                  repulse: {
                    distance: 100,
                    duration: 0.4
                  },
                  push: {
                    particles_nb: 4
                  },
                  remove: {
                    particles_nb: 2
                  }
                }
              },
              retina_detect: true
            }} />
        </div>
        {/* <div className="echarts" style={{
          // position: "relative",
          // zIndex: '2'
        }}>
          <Echarts />
        </div> */}
      </div>
    )
  }
}

export default Visual;