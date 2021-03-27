const s = (sketch) => {
  const scale = 10
  const cols = 50
  const rows = 50
  const noisiness = 0.002
  let zoff = 0

  let gridCanvas

  sketch.setup = () => {
    // eslint-disable-next-line no-unused-vars
    gridCanvas = new GridCanvas(rows, cols, scale, sketch)
    gridCanvas.createCanvas()
  }

  function createUnitVector(x, y, scale) {
    const angle = sketch.noise(x * noisiness, y * noisiness, zoff)
    myVec = new DisplayUnitVector(angle, 1, scale, 1, sketch)
    return myVec.show(x, y, scale)
  }

  sketch.draw = () => {
    sketch.background(255)
    gridCanvas.draw2DGrid(createUnitVector)
    zoff += 0.003
  }
}

// eslint-disable-next-line new-cap
const myp5 = new p5(s)
