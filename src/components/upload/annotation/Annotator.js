import React from "react"; 
import ReactLassoSelect, { getCanvas } from 'react-lasso-select';

export default function Annotator() {
  const [src, setImage] = useState("./demo.jpg");
  const [clippedImg, setClippedImg] = useState(
    ""
  );
  const [width, setWidth] = useState(300);
  const [logs, setLogs] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const init = "172,173 509,99 458,263"
    .split(" ")
    .map((c) => c.split(",").map(Number))
    .map(([x, y]) => ({ x, y }));
  const [points, setPoints] = useState<{ x: number; y: number }[]>(init);
  return (
    <div className="App">
      <ReactLassoSelect
        value={points}
        src={src}
        disabled={disabled}
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
        onImageError={() => setLogs([...logs, "image not loaded"])}
        onImageLoad={() => setLogs([...logs, "image loaded"])}
        imageStyle={{ width: `${width}px` }}
      />
      <br />
      <button onClick={() => setDisabled(!disabled)}>
        {!disabled ? "Lock" : "Unlock"}
      </button>
      <button
        onClick={() =>
          setImage(src === "./demo.jpg" ? "./demo2.jpg" : "./demo.jpg")
        }
      >
        Toggle image
      </button>
      Image width:{" "}
      <input
        type="range"
        min="0"
        max="1000"
        value={width}
        onChange={(e) => setWidth(+e.target.value)}
      />
      <br />
      Points: {points.map(({ x, y }) => `${x},${y}`).join(" ")}
      <br />
      <img src={clippedImg} alt="clipped" />
      <br />
      Logs:
      <ul
        dangerouslySetInnerHTML={{
          __html: logs.map((txt) => `<li>${txt}</li>`).join("")
        }}
      />
    </div>
  );
}

