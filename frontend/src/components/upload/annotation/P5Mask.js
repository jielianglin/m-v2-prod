import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

let img;
let pg;

export default function Marker() {
    const [color, setColor] = React.useState(['#ff0000']);
    const [image, setImage] = React.useState(null);



    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600, 600).parent(canvasParentRef);
        pg = p5.createGraphics(600, 600);
        img = p5.loadImage(image, img => {
            p5.image(img, 0, 0);
        });
    }

    const draw = p5 => {
        p5.image(img, 0, 0);
        pg.fill(color)
        pg.stroke(color);
        if (p5.mouseIsPressed) {
            pg.ellipse(p5.mouseX, p5.mouseY, 25);
        }

        p5.image(pg, 0, 0);
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
