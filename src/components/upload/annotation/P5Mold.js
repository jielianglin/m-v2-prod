import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

var r;
var img;

export default function P5Mold() {
    const [color, setColor] = React.useState(['#ff0000']);
    const [image, setImage] = React.useState(null);


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);

        img = p5.loadImage(image, img => {
            p5.image(img, 0, 0);
        });
    }

    const draw = p5 => {
        p5.image(img, 0, 0);

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

