const s = (sketch) => {
  const scale = 20
  const cols = 15
  const rows = 15

  let bfs
  let gridCanvas

  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch)
    gridCanvas.createCanvas()
    gridCanvas.createGrid((x, y) => new BFSCell(x, y, sketch))
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

  sketch.draw = () => {
    bfs.search()
    if (bfs.isDone) {
      bfs.computePath()
      gridCanvas.draw2DGrid(createRectangle)
      sketch.noLoop()
    }
    gridCanvas.draw2DGrid(createRectangle)
  }
}

// eslint-disable-next-line new-cap
const myp5 = new p5(s, 'p5sketch')
