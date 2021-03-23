const scale = 30
const cols = 20
const rows = 20
const noisiness = 0.04
const increment = 0.0005
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

function createUnitVector(i, j, scale) {
  const angle = noise(i * noisiness, j * noisiness, zoff)
  myVec = new DisplayUnitVector(angle, 1, scale, 1)
  return myVec
}

function updateAngle(gridCanvas, zoff) {
  for (let index = 0; index < gridCanvas.arrayLength; index++) {
    const vector = gridCanvas.grid[index]
    const coords = gridCanvas.arrayIndexToCellIndex(index)
    const angle = noise(coords.x * noisiness, coords.y * noisiness, zoff)
    vector.setAngle(angle)
  }
}

function draw() {
  updateAngle(gridCanvas, zoff)
  swarm.stepParticles(gridCanvas)
  zoff += increment
}
