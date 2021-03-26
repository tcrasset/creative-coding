const scale = 20
const cols = 14
const rows = 15

let dfs
let cells
let gridCanvas
const queue = []

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale)
  gridCanvas.createCanvas()
  gridCanvas.createGrid((x, y) => new DFSCell(x, y))
  gridCanvas.draw2DGrid(createRectangle)
  dfs = new DFS(
    gridCanvas,
    gridCanvas.getGridElementAtCellIndex(0, 0),
    gridCanvas.getGridElementAtCellIndex(12, 10)
  )
}

function createRectangle(cx, cy, scale) {
  gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale)
}

function draw() {
  dfs.search()
  gridCanvas.draw2DGrid(createRectangle)
  if (dfs.isDone) {
    dfs.computePath()
    gridCanvas.draw2DGrid(createRectangle)
    console.log('DONE!')
    noLoop()
  }
}
