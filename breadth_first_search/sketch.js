const scale = 20
const cols = 4
const rows = 4

let bfs
let cells
let gridCanvas
const queue = []

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale)
  gridCanvas.createCanvas()
  gridCanvas.createGrid((x, y) => new Cell(x, y))
  gridCanvas.draw2DGrid(createRectangle)
  bfs = new BFS(
    gridCanvas,
    gridCanvas.getGridElementAtCellIndex(0, 0),
    gridCanvas.getGridElementAtCellIndex(3, 3)
  )
}

function createRectangle(cx, cy, scale) {
  gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale)
}

function draw() {
  bfs.search()
  gridCanvas.draw2DGrid(createRectangle)
  if (bfs.isDone) {
    noLoop()
    console.log('DONE!')
  }
}
