const s = (sketch) => {
  const scale = 50
  const cols = 20
  const rows = 20
  const noisiness = 0.0003
  const increment = 0.0005
  let zoff = 0

  let gridCanvas

  sketch.setup = () => {
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
    zoff += increment
  }
}

// eslint-disable-next-line new-cap
const myp5 = new p5(s, 'p5sketch')
