const s = (sketch) => {
  const scale = 30
  const cols = 20
  const rows = 20
  const noisiness = 0.04
  const increment = 0.0005
  let zoff = 0

  let swarm
  let gridCanvas

  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch)
    gridCanvas.createGrid(createUnitVector)
    gridCanvas.createCanvas()
    sketch.background(51)
    swarm = new ParticleSwarm(100, sketch.color(255, 30), sketch)
  }

  function createUnitVector(i, j, scale) {
    const angle = sketch.noise(i * noisiness, j * noisiness, zoff)
    myVec = new DisplayUnitVector(angle, 1, scale, 1, sketch)
    return myVec
  }

  function updateAngle(gridCanvas, zoff) {
    for (let index = 0; index < gridCanvas.arrayLength; index++) {
      const vector = gridCanvas.grid[index]
      const coords = gridCanvas.arrayIndexToCellIndex(index)
      const angle = sketch.noise(
        coords.x * noisiness,
        coords.y * noisiness,
        zoff
      )
      vector.setAngle(angle)
    }
  }

  sketch.draw = () => {
    updateAngle(gridCanvas, zoff)
    swarm.stepParticles(gridCanvas)
    zoff += increment
  }
}

// eslint-disable-next-line new-cap
const myp5 = new p5(s, 'p5sketch')
