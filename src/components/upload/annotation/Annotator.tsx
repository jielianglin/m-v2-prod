import React from "react";
import ReactLassoSelect, { getCanvas } from 'react-lasso-select';

export default function Annotator() {

    const src = "./demo.jpg";
    const [points, setPoints] = React.useState<{ x: number; y: number }[]>([]);
    const [clippedImg, setClippedImg] = React.useState<string>();
    return (
        <div className="App">
            <ReactLassoSelect
                value={points}
                src={src}
                imageStyle={{ width: "400px" }}
                onChange={(path) => {
                    setPoints(path);
                }}
                onComplete={(path) => {
                    if (!path.length) return;
                    getCanvas(src, path, (err, canvas) => {
                        if (!err) {
                            setClippedImg(canvas.toDataURL());
                        }
                    });
                }}
            />
            <div>Points: {points.map(({ x, y }) => `${x},${y}`).join(" ")}</div>
            <div>
                <img src={clippedImg} alt="" />
            </div>
        </div>
    );
}


