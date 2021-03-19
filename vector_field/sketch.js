let scale = 10;
let cols = 50;
let rows = 50;
const noisiness = 0.002
let zoff = 0

var gridCanvas;

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale);
  gridCanvas.createCanvas();
}

function createUnitVector(x, y, scale) {
  const angle = noise(x*noisiness,y*noisiness, zoff);
  myVec = new DisplayUnitVector(angle, 1, scale, 1);
  myVec.show(x, y, scale);
}

function draw() {
  background(255)
  gridCanvas.draw2DGrid(shapeCallback=createUnitVector, null, strokeColor = 0);
  zoff += 0.003
}
