const scale = 30;
const cols = 20;
const rows = 20;
const noisiness = 0.0004;
const increment = 0.0005;
let zoff = 0;

let swarm;
var gridCanvas;

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale);
  gridCanvas.createCanvas();
  background(51);

  swarm = new PatricleSwarm(100,color(255,10));

}

function createUnitVector(x, y, scale) {
  let angle = noise(x * noisiness, y * noisiness, zoff);
  myVec = new DisplayUnitVector(angle, 1, scale, 1);
  // myVec.show(x, y, scale);
  return myVec;
}

function draw() {
  // background(255);
  gridCanvas.draw2DGrid(
    (shapeCallback = createUnitVector),
    null,
    (strokeColor = 0)
  );
  swarm.stepParticles(gridCanvas);
  zoff += increment;
}
