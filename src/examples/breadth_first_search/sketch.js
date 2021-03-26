const scale = 5
const cols = 50
const rows = 50

let bfs
let cells
let gridCanvas
const queue = []

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale)
  gridCanvas.createCanvas()
  gridCanvas.createGrid((x, y) => new BFSCell(x, y))
  gridCanvas.draw2DGrid(createRectangle)
  bfs = new BFS(
    gridCanvas,
    gridCanvas.getGridElementAtCellIndex(0, 0),
    gridCanvas.getGridElementAtCellIndex(10, 0)
  )
}

function createRectangle(cx, cy, scale) {
  gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale)
}

function draw() {
  bfs.search()
  if (bfs.isDone) {
    bfs.computePath()
    gridCanvas.draw2DGrid(createRectangle)
    noLoop()
  }
  gridCanvas.draw2DGrid(createRectangle)
}
