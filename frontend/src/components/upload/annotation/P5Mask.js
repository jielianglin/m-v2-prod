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
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createTheme } from "@material-ui/core/styles";

import MatchBar from "../../explore/Matchbar";

var slider;
var checkButton;
var clearButton;
var cnv;

var diameter = 50;
var smoothValue = 0.05;
let img;
let pg;

var x = 0;
var y = 0;
var imgWidth;
var imgHeight;

const theme = createTheme({
    palette: {
        primary: {
            main: "#B272CE",
        },
    },
});

export default function Mask() {

    const [color, setColor] = React.useState(['#B272CE']);
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

    const resetCanvas = () => {
        setCanvasImage(!canvasImage);
    }

    function setup(p5, canvasParentRef) {
        cnv = p5.createCanvas(600, 600).parent(canvasParentRef);

        img = p5.loadImage(canvasImage, img => {
            p5.image(img, 0, 0);
        });

        pg = p5.createGraphics(600, 600);

        checkButton = p5.createImg(`${CheckMark}`).style(
            'margin: 10px; width: 50px; height: 50px'
        )

        checkButton.position(100, 200);
        checkButton.mousePressed(setFiles);

        clearButton = p5.createImg(`${EraserIcon}`).style(
            'margin: 10px; width: 50px; height: 50px'
        )
        clearButton.position(100, 300);
        clearButton.mousePressed(resetSketch);

        slider = p5.createSlider(10, 100, 50, 10);
        slider.position(1175, 600);
        slider.style('width', '80px');
        slider.mousePressed(getDiameter);
    }

    function getDiameter(p5) {
        diameter = slider.value();
        return (diameter);
    }

    const draw = p5 => {
        if (color) {
            x = p5.lerp(p5.pmouseX, p5.mouseX, smoothValue);
            y = p5.lerp(p5.pmouseY, p5.mouseY, smoothValue);


            imgWidth = img.width;
            imgHeight = img.height;

            if (imgWidth > 0 && imgHeight > 0) {
                p5.resizeCanvas(imgWidth, imgHeight);
                if (imgWidth > 800) {
                    p5.resizeCanvas(700, imgHeight);
                }
            }

            p5.image(img, 0, 0);

            var transparency = p5.color(color);
            transparency.setAlpha(7);
            pg.noStroke();
            pg.fill(transparency);

            if (p5.mouseIsPressed) {
                pg.ellipse(x, y, diameter, diameter);
            }

            p5.image(pg, 0, 0, imgWidth, imgHeight);
        } else {
            return null
        }
    }

    function resetSketch(p5) {
        pg.clear();
    }

    //preparing files for p5 post
    function setFiles(p5) {
        let image = cnv.elt.toDataURL();
        let shape = pg.elt.toDataURL();
        return { image, shape };
    }

    let APIurl = "http://localhost:8000/images";

    //p5 post function
    // function P5PostRequest(p5) {
    //   p5.httpPost(APIurl, 'json', P5PostData,
    //     function (result) {
    //       console.log("postedCanvas")
    //     });
    // }

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
        setShapeVisibility(!shapeVisibility);
    }

    if (canvasImage) {
        return (
            <div>
                <br />
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7", padding: "50px", maxWidth: "800px", height: "auto" }}>
                    <Caption enteredCaption={enteredCaption} />
                    <div>
                        <br />
                        <Sketch setup={setup} draw={draw}
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
                        <div className="returnForm" style={{ backgroundColor: "#FFFFFF", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7", padding: "50px", maxWidth: "800px", height: "auto" }}>
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
                            <Button onClick={showShape}>
                                {shapeVisibility ? <VisibilityOffIcon fontsize="medium" /> : <VisibilitySharpIcon fontsize="medium" />}
                            </Button>
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
                                        <Chip className="chip1" style={{ color: "#B272CE", backgroundColor: "#FFFFFF" }} avatar={
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
                                        <Typography variant="h12" color="#000000">
                                            <i>[couldn't identify any tags] </i>
                                        </Typography>
                                    )}
                                    <div>
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
                                    </div>
                                    <div>
                                        {returnAITags.map((aiitem) => {
                                            return (
                                                <MatchBar
                                                    match={parseFloat(aiitem.confidence)}
                                                    aitag={aiitem.tag}
                                                />
                                            );
                                        })}
                                    </div>
                                </span>
                                <br />
                                <Button onClick={resetCanvas}>Back to WellBeing upload</Button>
                                <br />
                            </ThemeProvider>
                        </div >
                        : null
                }
            </div>)
    } else {
        return (
            <FileInput selectImage={setCanvasImage} />
        );
    }
}
