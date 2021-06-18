import React, { useRef } from 'react';
import Sketch from 'react-p5';
import ColorSelector from './ColorSelector';
import FileInput from '../FileInput';

let cvs;
let penSize = 5;
let penState = 0;
let color;

let init;
var x, y, px, py;
var paths = [];
var currentPath = [];

let img;
let pg;
let path;


export default class P5LassoClassComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.fileInput = React.createRef();
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        console.log('P5LassoClassComp updated')
    }

    handleImageSelection = (event) => {
        const that = this;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            that.setState({ src: e.target.result });
            img = that.p5.loadImage(`${e.target.result}`);
        };
        reader.readAsDataURL(file);
    };

    openFileInput = () => {
        this.fileInput.current.click();
    };

    setup = (p5, canvasParentRef) => {
        this.p5 = p5;
        color = p5.color('#ff0000');
        cvs = p5.createCanvas(600, 600).parent(canvasParentRef);
        pg = p5.createGraphics(600, 600);
        // img = p5.loadImage(`${this.state.src}`);
    }

    draw = (p5) => {
        x = p5.mouseX;
        y = p5.mouseY;
        px = p5.pmouseX;
        py = p5.pmouseY;


        p5.background(p5.color('#9e9e9e'))
        if (img) {
            p5.image(img, 0, 0, 300, 300)
        }
        pg.strokeWeight(penSize);

        if (p5.mouseIsPressed) {
            if (penState === 0) {


                pg.stroke(`${this.p5.color}`);
                
                console.log(`${this.p5.color}`);

                pg.line(x, y, px, py);
                currentPath.push([x, y]);
                init = currentPath[0];
                console.log(init);
            }
        }
        p5.image(pg, 0, 0);
        // console.log('graphics renderer');
    }

    mouseReleased = (pg) => {
        if (this.state.src != null) {
            pg.line(x, y, ...init);
            currentPath = [];
            paths.push(currentPath);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.openFileInput}>upload</button>
                    {this.state.src &&
                        <img
                            style={{ height: "100%" }}
                            className="loaded-image"
                            src={this.state.src}
                            alt=""
                        />
                    }
                    <label>
                        <input
                            ref={this.fileInput}
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={this.handleImageSelection}
                        />
                    </label>
                </div>
                <div>
                    <Sketch setup={this.setup} draw={this.draw} mouseReleased={this.mouseReleased} />
                    <ColorSelector selectColor={newColor => this.p5.color(newColor)} />
                </div>
            </div>

        );
    }
}