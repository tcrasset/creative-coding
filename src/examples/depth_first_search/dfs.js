class DFS {
  constructor(
    gridCanvas = required(),
    root = required(),
    end = required(),
    _p5 = required()
  ) {
    this.p5 = _p5

    // `root` and `end` are DFSCell types
    this.gridCanvas = gridCanvas
    this.queue = [root]
    this.root = root
    this.end = end

    this.isDone = false
  }

  search() {
    if (this.queue.length != 0) {
      const elem = this.queue.pop()

      if (!elem.discovered) {
        elem.discover()

        const neighboursCoordinates = this.gridCanvas.neighbours(elem.i, elem.j)

        neighboursCoordinates.forEach((neighbour) => {
          const neighbourCell = this.gridCanvas.getGridElementAtCellIndex(
            neighbour.x,
            neighbour.y
          )
          this.queue.push(neighbourCell)

          // We push the parent only if the node is visited the first time
          if (neighbourCell.parent == null) neighbourCell.parent = elem
        })
      }

      if (elem === this.end) {
        this.isDone = true
        return
      }
    } else {
      console.log('No solution!')
      this.p5.noLoop()
      return
    }
  }

  computePath() {
    let curr = this.end
    this.end.isOnPath = true
    this.root.isOnPath = true

    while (curr != this.root) {
      curr.isOnPath = true
      curr = curr.parent
    }
  }
}

class DFSCell extends Cell {
  constructor(i = required(), j = required(), _p5 = required()) {
    super(i, j, _p5)
    this.parent = null
    this.discovered = false
    this.isOnPath = false
  }

  discover() {
    this.discovered = true
  }

  show(cx, cy, scale) {
    let cellColor
    if (this.isOnPath) {
      cellColor = this.p5.color(0, 0, 255)
    } else if (this.discovered) {
      cellColor = this.p5.color(255, 0, 0)
    } else {
      cellColor = this.p5.color(0, 255, 0)
    }
    super.show(cx, cy, scale, cellColor, this.p5.color(0))
  }
}
