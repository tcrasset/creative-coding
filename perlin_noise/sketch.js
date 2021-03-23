const scale = 50;
const cols = 5;
const rows = 5;
const noisiness = 0.03;

var gridCanvas;

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale);
  gridCanvas.createCanvas();
  gridCanvas.draw2DGrid(createRectangle);
  noLoop();
}

function createRectangle(cx, cy, scale) {
  let noiseColor = map(noise(cx*noisiness, cy*noisiness), 0, 1, 0, 255);
  fill(color(noiseColor));
  noStroke()
  return rect(cx, cy, cx + scale, cy + scale);
}
