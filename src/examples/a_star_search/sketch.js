const s = (sketch) => {
  const scale = 10;
  const cols = 15;
  const rows = 15;

  let astar;
  let gridCanvas;

  sketch.setup = () => {
    gridCanvas = new GridCanvas(rows, cols, scale, sketch);
    gridCanvas.createCanvas();
    gridCanvas.createGrid((x, y) => new AStarCell(x, y, sketch));
    gridCanvas.draw2DGrid(createRectangle);
    astar = new AStar(
      gridCanvas,
      gridCanvas.getGridElementAtCellIndex(0, 0),
      gridCanvas.getGridElementAtCellIndex(10, 10),
    );
  };

  function createRectangle(cx, cy, scale) {
    gridCanvas.getGridElementAtCoordinate(cx, cy).show(cx, cy, scale);
  }

  sketch.draw = () => {
    astar.search();
    if (astar.isDone) {
      astar.computePath();
      gridCanvas.draw2DGrid(createRectangle);
      sketch.noLoop();
    }
    gridCanvas.draw2DGrid(createRectangle);
  };
};

// eslint-disable-next-line new-cap
const myp5 = new p5(s, 'p5sketch');
