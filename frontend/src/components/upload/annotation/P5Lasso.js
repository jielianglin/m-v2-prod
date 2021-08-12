import React from 'react';
import axios from "axios";

import FileInput from '../FileInput';
import Tags from './Tags';
import Caption from './Caption';

import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import EraserIcon from './eraser/EraserIcon.png';

import { Typography, Chip, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme } from "@material-ui/core/styles";


var smoothValue = 0.05;
var init;
var x = 0;
var y = 0;
var path = [];
var currentPath = [];
var img;
var pg;
var clearButton;
var imgWidth;
var imgHeight;
var P5PostData;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9611ff",
    },
    secondary: {
      main: "#668389",
    },
  },
});

export default function P5Lasso() {
  const [color, setColor] = React.useState(['#ff0000']);
  const [image, setImage] = React.useState(null);
  const [canvasImage, setCanvasImage] = React.useState(null);

  const [post, setPost] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [src, setSrc] = React.useState(null);
  const [caption, setCaption] = React.useState(null);
  const [returnCaption, setReturnCaption] = React.useState(null);
  const [returnTags, setReturnTags] = React.useState([])
  const [returnAITags, setReturnAITags] = React.useState([]);
  const [progress, setProgress] = React.useState(false);

  const enteredCaption = (caption) => {
    setCaption(caption);
  };
  const selectedTags = (tags) => {
    setTags(tags);
  };

  const selectedImage = (img) => {
    setImage(img);
  };

  const resetCanvas = () => {
    setCanvasImage(!canvasImage);
  }



  function setup(p5, canvasParentRef) {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);

    //Preparing graphics for post
    let imageBase64String = pg.elt.toDataURL();
    P5PostData = { Vector: imageBase64String };

    p5.background('black');
    img = p5.loadImage(canvasImage, img => {
      p5.image(img, 0, 0);
    });

    clearButton = p5.createImg(`${EraserIcon}`).style(
      'margin: 10px; width: 50px; height: 50px'
    )
    clearButton.position(1175, 500);
    clearButton.mousePressed(resetSketch);
  }

  function draw(p5) {
    x = p5.lerp(x, p5.mouseX, smoothValue);
    y = p5.lerp(y, p5.mouseY, smoothValue);

    imgWidth = img.width;
    imgHeight = img.height;

    if (imgWidth > 0 && imgHeight > 0) {
      p5.resizeCanvas(imgWidth, imgHeight);
      if (imgWidth > 700) {
        p5.resizeCanvas(700, imgHeight);
      }
    }

    p5.image(img, 0, 0);

    if (p5.mouseIsPressed) {
      pg.fill(color);
      pg.stroke(color);
      pg.strokeWeight(1);
      pg.ellipse(x, y, 15, 15);
      currentPath.push([x, y]);
      init = currentPath[0];
    }
    p5.image(pg, 0, 0, imgWidth, imgHeight);
  }

  function mouseReleased(p5) {
    if (image) {
      pg.strokeWeight(15);
      pg.line(x, y, ...init);
      currentPath = [];
      path.push(currentPath);
    }
  }

  function resetSketch(p5) {
    pg.clear();
  }

  let APIurl = "http://localhost:8000/images";

  //p5 post function
  function P5PostRequest(p5) {
    p5.httpPost(APIurl, 'json', P5PostData,
      // function(result) {
      //   return
      //   (
      //     //should return the graphics layer with createIMG() or <img />
      //     
      //   )
    )
  }


  async function postData() {
    setProgress(true);
    console.log(tags);
    console.log(tags.join(","));
    P5PostRequest();
    let formData = new FormData();
    formData.append("file", image);
    formData.append("tags", tags.join(","));
    formData.append("caption", caption);
    let response = await axios.post(APIurl, formData);
    // props.newTitle();
    setSrc(`http://localhost:8000/images/${response.data.id}.jpeg`);
    console.log(response.data.caption);
    setReturnCaption(response.data.caption);
    console.log(response.data.tags);
    setReturnTags(response.data.tags);
    console.log(response.data.ai_tags);
    setReturnAITags(response.data.ai_tags || []);
    setPost(true);
    setProgress(false);
  }

  if (image) {
    return (
      <div>
        {post ?
          <div className="returnForm">
            < img
              style={{
                display: "block",
                margin: "0 auto",
                height: "50%",
                borderRadius: "5px",
              }}
              className="returned-image"
              src={src}
              alt=""
            />
            <br />
            <ThemeProvider theme={theme}>
              <Typography variant="h6" color="primary">
                <div className="returned-caption">
                  <i>"</i>
                  <i>
                    {" "}
                    <span>{returnCaption}</span>{" "}
                  </i>
                  <i>"</i>
                </div>
              </Typography>
              <br />
              <span className="tags-return">
                <Typography color="primary"> Your Tags: </Typography>
                {returnTags.map((item) => (
                  <Chip className="chip1" style={{ color: "#000000", backgroundColor: "#B272CE" }}

                    className="returned-tags-chip"
                    avatar={
                      <Avatar style={{ color: "#E6DAC8" }}>
                        <div style={{ color: "#FFFFFF" }}>
                          #
                        </div>
                      </Avatar>
                    }
                    key={item.id}
                    label={item.tag}
                    variant="outlined"
                  />
                ))}
              </span>
              <br />
              <br />
              <span className="ai_tags_return">
                <Typography color="secondary"> Tags from ImageNet AI: </Typography>
                {returnAITags.length === 0 && (
                  <Typography variant="h12" color="secondary">
                    <i>[couldn't identify any tags] </i>
                  </Typography>
                )}

                {returnAITags.map((item) => (
                  <Chip className="chip2" style={{ color: "#000000", backgroundColor: "#FFFFFF" }}
                    avatar={
                      <Avatar style={{ background: "#B5BCB4" }}>
                        <div style={{ color: "#FFFFFF" }}>
                          #
                        </div>
                      </Avatar>
                    }
                    key={item.id}
                    label={item.tag}
                  />
                ))}
              </span>
              <br />
              <Button onClick={resetCanvas}>Back to WellBeing upload</Button>
              <br />
            </ThemeProvider>
          </div >
          :
          <div>
            <br />
            <div style={{ backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7", padding: "50px", maxWidth: "800px", height: "auto" }}>
              <Caption enteredCaption={enteredCaption} />
              {image && (

                <div>
                  <br />
                  <Sketch setup={setup} draw={draw}
                    mouseReleased={mouseReleased}
                  />
                </div>
              )}
              <br />
              <Tags selectedTags={selectedTags} />
            </div>
            <ColorSelector selectColor={color => setColor(color)} />
            <div className="save-data">
              <Button
                disabled={!image || !caption || tags.length === 0}
                className="save-button"
                palette="primary"
                onClick={postData}
              >
                {" "}
                Save{" "}
              </Button>
              <ThemeProvider theme={theme}>
                {progress && <CircularProgress />}
              </ThemeProvider>
            </div>
          </div>
        }
      </div>
    )
  } else {
    return (
      <FileInput
        //is this needed?
        selectImage={setCanvasImage}
        selectedImage={selectedImage}
      />
    );
  }
}