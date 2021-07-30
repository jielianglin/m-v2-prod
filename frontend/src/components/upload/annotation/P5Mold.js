import React from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

var b;
var img;
var pg;
var imgWidth;
var imgHeight;

var angleSlider;
let distanceSlider;

var blobPoints = [];
let numPoints = 6; // try different values for different shaped blobs
let baseRadius = 100;
let radiusRandomness = 0.2; // amount of random variation in the blob radius 
let cpOffsetAngle;
let cpdist;

var transparency;

export default function P5Mold() {
    const [color, setColor] = React.useState(['#ff0000']);
    const [image, setImage] = React.useState(null);


    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(300, 600).parent(canvasParentRef);
        pg = p5.createGraphics(300, 600);
        img = p5.loadImage(image, img => {
            p5.image(img, 0, 0);
        });

        angleSlider = p5.createSlider(0, 2.4, 2, 0.05);
        angleSlider.position(200, 250);
        angleSlider.changed(buildBlob);

        distanceSlider = p5.createSlider(10, 150, 50, 5);
        distanceSlider.position(200, 300);
        distanceSlider.changed(buildBlob);

        buildBlob();
    }

    const draw = p5 => {
        if (image) {
            imgWidth = img.width;
            imgHeight = img.height;

            if (imgWidth > 0 && imgHeight > 0) {
                p5.resizeCanvas(imgWidth, imgHeight);
            }

            p5.image(img, 0, 0);
            transparency = p5.color(color);
            transparency.setAlpha(10);

            pg.fill(transparency);
            pg.stroke(transparency);

            pg.beginShape();
            pg.vertex();
            for (b = 1; b < blobPoints.length; b++) {
                let bp = blobPoints[b];
                let pp = blobPoints[b - 1];
                pg.bezierVertex(pp.cp[1].x, pp.cp[1].y, bp.cp[0].x, bp.cp[0].y, bp.x, bp.y);

                let lastp = blobPoints[blobPoints.length - 1];
                let firstp = blobPoints[0]

                pg.bezierVertex(lastp.cp[1].x, lastp.cp[1].y, firstp.cp[0].x, firstp.cp[0].y, firstp.x, firstp.y);
                pg.endShape();

            }
            p5.image(pg, 0, 0, imgWidth, imgHeight);

        } else {
            return null
        }
    }

    function buildBlob(p5) {
        pg.clear();


        blobPoints = [];

        cpOffsetAngle = angleSlider.value();
        cpdist = distanceSlider.value();

        for (let p = 0; p < numPoints; p++) {
            let a = p * (Math.PI * 2) / numPoints;
            let r = baseRadius + Math.random(-radiusRandomness * baseRadius, radiusRandomness * baseRadius);

            let bp = {
                x: Math.cos(a) * r,
                y: Math.sin(a) * r,
                angle: a,
                cp: []
            };
            blobPoints.push(bp);
        }

        for (let b = 0; b < blobPoints.length; b++) {
            let thisp = blobPoints[b];
            let randomangle = Math.random(-cpOffsetAngle, cpOffsetAngle);

            let cp1angle = thisp.angle - ((Math.PI / 2) + randomangle);
            let cp2angle = thisp.angle + ((Math.PI / 2) - randomangle);

            let cp1 = {
                x: thisp.x + (Math.cos(cp1angle) * cpdist),
                y: thisp.y + (Math.sin(cp1angle) * cpdist)
            };
            let cp2 = {
                x: thisp.x + (Math.cos(cp2angle) * cpdist),
                y: thisp.y + (Math.sin(cp2angle) * cpdist)
            };

            thisp.cp = [cp1, cp2];
        }
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

