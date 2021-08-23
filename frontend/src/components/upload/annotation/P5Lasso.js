import React from 'react';
import axios from "axios";

import FileInput from '../FileInput';
import Tags from './Tags';
import Caption from './Caption';

import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';

import EraserIcon from './eraser/EraserIcon.png';
import CheckMark from './checkmark/CheckMark.png';

import { Typography, Chip, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';

import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme } from "@material-ui/core/styles";


var checkButton;
var cnv;
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#B272CE",
    },
  },
});

export default function P5Lasso() {
  const [color, setColor] = React.useState(["#B272CE"]);
  const [canvasImage, setCanvasImage] = React.useState(null);

  const [post, setPost] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [src, setSrc] = React.useState(null);
  const [caption, setCaption] = React.useState(null);
  const [returnCaption, setReturnCaption] = React.useState(null);
  const [returnTags, setReturnTags] = React.useState([])
  const [returnAITags, setReturnAITags] = React.useState([]);
  const [returnShape, setReturnShape] = React.useState([]);
  const [shapeVisibility, setShapeVisibility] = React.useState(false);
  const [progress, setProgress] = React.useState(false);

  const enteredCaption = (caption) => {
    setCaption(caption);
  };
  const selectedTags = (tags) => {
    setTags(tags);
  };

  // const selectedImage = (img) => {
  //   setImage(img);
  //   setCanvasImage(img);
  //   console.log("setImage");
  // };

  const resetCanvas = () => {
    setCanvasImage(!canvasImage);
  }

  function setup(p5, canvasParentRef) {
    cnv = p5.createCanvas(600, 600).parent(canvasParentRef);
    pg = p5.createGraphics(600, 600);
    p5.background('black');
    img = p5.loadImage(canvasImage, img => {
      p5.image(img, 0, 0);
      console.log("canvasImage");
    });

    checkButton = p5.createImg(`${CheckMark}`).style(
      'margin: 10px; width: 50px; height: 50px'
    )

    checkButton.position(100, 100);
    checkButton.mousePressed(setFiles);

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
    if (canvasImage) {
      pg.strokeWeight(15);
      pg.line(x, y, ...init);
      currentPath = [];
      path.push(currentPath);
    }
  }

  function resetSketch(p5) {
    pg.clear();
  }

  //preparing files for post
  function setFiles(p5) {
    let image = cnv.elt.toDataURL();
    let shape = pg.elt.toDataURL();
    return { image, shape };
  }

  let APIurl = "http://localhost:8000/images";

  // main post function
  async function postData(p5) {
    let { image, shape } = setFiles(p5);

    let formData = new FormData();
    console.log(tags.join(","));
    formData.append("tags", tags.join(","));
    formData.append("caption", caption);
    formData.append("file", image);
    formData.append("shape", shape);

    let response = {};
    try {
      response = await axios.post(APIurl, formData);
    } catch (e) {
      console.error(e);
      return;
    }

    setSrc(`http://localhost:8000/images/${response.data.id}.jpeg`);
    console.log(response.data.caption);
    setReturnCaption(response.data.caption);
    console.log(response.data.tags);
    setReturnTags(response.data.tags);
    console.log(response.data.ai_tags);
    setReturnAITags(response.data.ai_tags || []);
    setReturnShape(`http://localhost:8000/images/${response.data.shape.id}.png`);
    setPost(true);
    setProgress(false);
  }

  const showShape = () => {
    setShapeVisibility(true);
  }

  if (canvasImage) {
    return (
      <div>
        <br />
        <div style={{ backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7", padding: "50px", maxWidth: "800px", height: "auto" }}>
          <Caption enteredCaption={enteredCaption} />
          <div>
            <br />
            <Sketch
              setup={setup}
              draw={draw}
              mouseReleased={mouseReleased}
              resetSketch={resetSketch}
              setFiles={setFiles}
            />
          </div>
          <br />
          <Tags selectedTags={selectedTags} />
        </div>
        <ColorSelector selectColor={color => setColor(color)} />
        <div className="save-data">
          <Button
            disabled={!canvasImage || !caption || tags.length === 0}
            className="save-button"
            palette="primary"
            onClick={postData}
          >
            {" "}
            Save{" "}
          </Button>
          <ThemeProvider theme={theme}>
            {progress &&
              <CircularProgress />}
          </ThemeProvider>
        </div>


        {
          post ?
            <div className="returnForm">
              < img
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "50%",
                  borderRadius: "5px",
                  zLayer: 1,
                }}
                className="returned-image"
                src={src}
                alt=""
              />
              {shapeVisibility &&
                <img
                  style={{
                    display: "block",
                    margin: "0 auto",
                    height: "50%",
                    borderRadius: "5px",
                    zLayer: 2,
                  }}
                  className="returned-shape"
                  src={returnShape}
                  alt=""
                />
              }

              <br />
              <Button onClick={showShape}><VisibilitySharpIcon fontsize="medium" /></Button>
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
                    <Chip className="chip1" style={{ color: "#B272CE", backgroundColor: "#FFFFFF" }}

                      className="returned-tags-chip" avatar={
                        <Avatar style={{ color: "#B272CE" }}>
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
                <Button onClick={resetCanvas}>Back to Well-Being upload</Button>
                <br />
              </ThemeProvider>
            </div >
            : null
        }
      </div>)
  } else {
    return (
      <div>
        <FileInput
          selectImage={setCanvasImage}
        // selectedImage={selectedImage}
        />
      </div>
    );
  }
}