/* eslint-disable new-cap */
import p5 from 'p5';
import {GridCanvas, IShapeCallback} from '../../core/gridCanvas'
const s = (sketch : p5) => {
  const scale = 10;
  const cols = 100;
  const rows = 100;
  const noisiness = 0.003;
  let gridCanvas;

  const createRectangle : IShapeCallback = (cx : number, cy : number, scale : number) : void => {
    const noiseColor = sketch.map(
      sketch.noise(cx * noisiness, cy * noisiness),
      0,
      1,
      0,
      255,
    );
    sketch.fill(sketch.color(noiseColor));
    sketch.noStroke();
    sketch.rect(cx, cy, cx + scale, cy + scale);
  };
  
  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch);
    gridCanvas.createCanvas();
    gridCanvas.draw2DGrid(createRectangle);
    sketch.noLoop();
  };

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myp5 = new p5(s,("p5sketch" as never));
