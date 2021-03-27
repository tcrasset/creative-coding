const s = (sketch) => {
  const scale = 20
  const cols = 15
  const rows = 15

  let dfs
  let gridCanvas

  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch)
    gridCanvas.createCanvas()
    gridCanvas.createGrid((x, y) => new DFSCell(x, y, sketch))
    gridCanvas.draw2DGrid(createRectangle)
    dfs = new DFS(
      gridCanvas,
      gridCanvas.getGridElementAtCellIndex(0, 0),
      gridCanvas.getGridElementAtCellIndex(12, 10),
      sketch
    )
  }

  function createRectangle(cx, cy, scale) {
    gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale)
  }

  sketch.draw = () => {
    dfs.search()
    gridCanvas.draw2DGrid(createRectangle)
    if (dfs.isDone) {
      dfs.computePath()
      gridCanvas.draw2DGrid(createRectangle)
      console.log('DONE!')
      sketch.noLoop()
    }
  }
}

// eslint-disable-next-line new-cap
const myp5 = new p5(s, 'p5sketch')
