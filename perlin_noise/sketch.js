const scale = 3;
const cols = 100;
const rows = 100;
const noisiness = 0.003;

var gridCanvas;

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale);
  gridCanvas.createCanvas();
  gridCanvas.draw2DGrid(createRectangle);
}

function createRectangle(cx, cy, scale) {
  let noiseColor = map(noise(cx*noisiness, cy*noisiness), 0, 1, 0, 255);
  fill(color(noiseColor));
  noStroke()
  return rect(cx, cy, cx + scale, cy + scale);
}

function draw() {
  noLoop();
}
