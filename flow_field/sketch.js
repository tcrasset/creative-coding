const scale = 30
const cols = 20
const rows = 20
const noisiness = 0.004
const increment = 0.005
let zoff = 0

let swarm
let gridCanvas

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale)
  gridCanvas.createGrid(createUnitVector)
  gridCanvas.createCanvas()
  background(51)

  swarm = new ParticleSwarm(100, color(255, 30))
}

function createUnitVector(x, y, scale) {
  const angle = noise(x * noisiness, y * noisiness, zoff)
  myVec = new DisplayUnitVector(angle, 1, scale, 1)
  // myVec.show(x, y, scale);
  return myVec
}

function updateAngle(gridCanvas, zoff) {
  for (let index = 0; index < gridCanvas.arrayLength; index++) {
    const vector = gridCanvas.grid[index]
    const coords = gridCanvas.arrayIndexToCellIndex(index)
    console.log(coords)
    const angle = noise(coords.x * noisiness, coords.y * noisiness, zoff)
    if (index == 0) console.log(angle)
    vector.setAngle(angle)
  }
}

function draw() {
  updateAngle(gridCanvas, zoff)
  // console.log(gridCanvas.grid[25].angle());
  swarm.stepParticles(gridCanvas)
  zoff += increment
}
