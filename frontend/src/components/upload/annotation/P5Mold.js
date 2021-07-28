import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';
import EraserIcon from './eraser/EraserIcon.png'

var clearButton;
var r;
var img;
var pg;
var imgWidth;
var imgHeight;

export default function P5Mold() {
    const [color, setColor] = React.useState(['#ff0000']);
    const [image, setImage] = React.useState(null);


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);
        pg = p5.createGraphics(600, 600);
        img = p5.loadImage(image, img => {
            p5.image(img, 0, 0);
        });

        clearButton = p5.createImg(`${EraserIcon}`).style(
            'margin: 10px; width: 50px; height: 50px'
        )
        clearButton.position(200, 200);
        clearButton.mousePressed(resetSketch);
    }

    const draw = p5 => {
        if (color) {

            imgWidth = img.width;
            imgHeight = img.height;

            if (imgWidth > 0 && imgHeight > 0) {
                p5.resizeCanvas(imgWidth, imgHeight);
            }

            p5.image(img, 0, 0);

            if (p5.mouseIsPressed) {
                r = p5.width * 0.50;
                p5.noStroke();
                p5.fill(color);
                p5.translate(p5.width / 2, p5.height / 2);

                p5.push();
                p5.scale(p5.mouseX / 100, p5.mouseY / 100);
                p5.translate(p5.width / 2, p5.height / 2);
                p5.beginShape();
                p5.vertex(0, -r);
                p5.quadraticVertex(r, -r, r, 0);
                p5.quadraticVertex(r, r, 0, r);
                p5.quadraticVertex(-r, r, -r, 0);
                p5.quadraticVertex(-r, -r, 0, -r);
                p5.endShape();
            }
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
                {image && (
                    <div>
                        <Sketch setup={setup} draw={draw} />
                    </div>
                )}
                <ColorSelector selectColor={color => setColor(color)} />
            </div>
        )

    } else {
        return (
            <FileInput selectImage={setImage} />
        );
    }
}

