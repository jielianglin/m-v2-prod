import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';
import EraserIcon from './eraser/EraserIcon.png'
import Tags from './Tags';
import Caption from './Caption';

var slider;
var diameter = 50;
var smoothValue = 0.05;
let img;
let pg;
var clearButton;
var x = 0;
var y = 0;
var imgWidth;
var imgHeight;


export default function Mask() {
    const [color, setColor] = React.useState(['#ff0000']);
    const [image, setImage] = React.useState(null);

    function setup(p5, canvasParentRef) {
        p5.createCanvas(600, 600).parent(canvasParentRef);
        pg = p5.createGraphics(600, 600);
        img = p5.loadImage(image, img => {
            p5.image(img, 0, 0);
        });

        clearButton = p5.createImg(`${EraserIcon}`).style(
            'margin: 10px; width: 50px; height: 50px'
        )
        clearButton.position(1175, 500);
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


    if (image) {
        return (
            <div>
                <br />
                <div style={{ padding: "50px", height: "auto", backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7" }}>
                    <Caption />
                    {image && (
                        <div>
                            <br />
                            <Sketch setup={setup} draw={draw} />
                        </div>
                    )}
                    <ColorSelector selectColor={color => setColor(color)} />
                    <Tags />
                </div>
                <br />
            </div>
        )
    } else {
        return (
            <FileInput selectImage={setImage} />
        );
    }
}
