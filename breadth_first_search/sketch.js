const scale = 10
const cols = 50
const rows = 50

let bfs
let cells
let gridCanvas
const queue = []
let root
let end

function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale)
  gridCanvas.createCanvas()
  gridCanvas.createGrid(createCell)
  gridCanvas.draw2DGrid(createRectangle)
  bfs = new BFS(gridCanvas)
  root = gridCanvas.getGridElementAtCellIndex(0, 0)
  end = gridCanvas.getGridElementAtCellIndex(0, 5)
  queue.push(root)
}

function createCell(x, y) {
  return new Cell(x, y)
}

function createRectangle(cx, cy, scale) {
  gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale)
}

function draw() {
  // bfs.search(gridCanvas.getGridElementAtCellIndex(0, 0), gridCanvas.getGridElementAtCellIndex(cols - 1, rows - 1))

  if (queue.length != 0) {
    const elem = queue.pop()
    if (elem === end) {
      console.log('DONE!')
      noLoop()
      return
    }
    console.log(elem.x, elem.y)
    const neighboursCoordinates = gridCanvas.neighbours(elem.x, elem.y)
    neighboursCoordinates.forEach((neighbour) => {
      const neighbourCell = gridCanvas.getGridElementAtCellIndex(
        neighbour.x,
        neighbour.y
      )

      if (!neighbourCell.discovered) {
        neighbourCell.discover()
        queue.push(neighbourCell)
      }
    })
  } else {
    console.log('No solution!')
    noLoop()
    return
  }

  gridCanvas.draw2DGrid(createRectangle)
}
