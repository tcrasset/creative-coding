const scale = 10
const cols = 50
const rows = 50
const noisiness = 0.002
let zoff = 0

let gridCanvas

// eslint-disable-next-line no-unused-vars
function setup() {
    gridCanvas = new GridCanvas(rows, cols, scale)
    gridCanvas.createCanvas()
}

function createUnitVector(x, y, scale) {
    const angle = noise(x * noisiness, y * noisiness, zoff)
    myVec = new DisplayUnitVector(angle, 1, scale, 1)
    return myVec.show(x, y, scale)
}

// eslint-disable-next-line no-unused-vars
function draw() {
    background(255)
    gridCanvas.draw2DGrid(
        (shapeCallback = createUnitVector),
        null,
        (strokeColor = 0)
    )
    zoff += 0.003
}
