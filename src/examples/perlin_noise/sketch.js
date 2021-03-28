/* eslint-disable new-cap */
const s = (sketch) => {
  const scale = 10;
  const cols = 100;
  const rows = 100;
  const noisiness = 0.003;
  let gridCanvas;

  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch);
    gridCanvas.createCanvas();
    gridCanvas.draw2DGrid(createRectangle);
    sketch.noLoop();
  };

  createRectangle = (cx, cy, scale) => {
    const noiseColor = sketch.map(
      sketch.noise(cx * noisiness, cy * noisiness),
      0,
      1,
      0,
      255,
    );
    sketch.fill(sketch.color(noiseColor));
    sketch.noStroke();
    return sketch.rect(cx, cy, cx + scale, cy + scale);
  };
};

const myp5 = new p5(s, 'p5sketch');
