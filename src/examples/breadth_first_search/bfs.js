class BFS {
  constructor(gridCanvas = required(), root = required(), end = required()) {
    // `root` and `end` are Cell types
    root.discover(null);
    this.gridCanvas = gridCanvas;
    this.queue = [root];
    this.root = root;
    this.end = end;
    this.isDone = false;
  }
  search() {
    if (this.queue.length != 0) {
      const elem = this.queue.shift();
      elem.current = true;
      if (elem === this.end) {
        this.isDone = true;
        return;
      }

      const neighboursCoordinates = this.gridCanvas.neighbours(elem.i, elem.j);

      neighboursCoordinates.forEach((neighbour) => {
        const neighbourCell = this.gridCanvas.getGridElementAtCellIndex(
          neighbour.x,
          neighbour.y,
        );
        if (!neighbourCell.discovered) {
          neighbourCell.discover(elem);
          this.queue.push(neighbourCell);
        }
      });
    } else {
      console.log('No solution!');
      noLoop();
      return;
    }
  }

  computePath() {
    let curr = this.end;
    this.end.isOnPath = true;
    this.root.isOnPath = true;

    while (curr != this.root) {
      curr.isOnPath = true;
      curr = curr.parent;
    }
  }
}

class BFSCell extends Cell {
  constructor(i = required(), j = required(), _p5 = required()) {
    super(i, j, _p5);
    this.parent = null;
    this.discovered = false;
    this.current = false;
    this.isOnPath = false;
  }

  discover(parent = required()) {
    this.parent = parent;
    this.discovered = true;
  }

  show(cx, cy, scale) {
    let cellColor;
    const cp = new ColorPalette(this.p5);

    if (this.isOnPath) {
      cellColor = cp.dieselBlue;
    } else if (this.current) {
      cellColor = cp.salmonPink;
    } else if (this.discovered) {
      cellColor = cp.grey;
    } else {
      cellColor = cp.offWhite;
    }
    super.show(cx, cy, scale, cellColor, this.p5.color(0));
  }
}
