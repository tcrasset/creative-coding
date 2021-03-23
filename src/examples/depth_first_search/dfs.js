class DFS {
  constructor(gridCanvas = required(), root = required(), end = required()) {
    // `root` and `end` are Cell types
    this.gridCanvas = gridCanvas
    this.queue = [root]
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
          const neighbourCell = gridCanvas.getGridElementAtCellIndex(
            neighbour.x,
            neighbour.y
          )
          this.queue.push(neighbourCell)
        })
      }

      if (elem === this.end) {
        this.isDone = true
        return
      }
    } else {
      console.log('No solution!')
      noLoop()
      return
    }
  }
}

class DFSCell extends Cell {
  constructor(i = required(), j = required()) {
    super(i, j)
    this.discovered = false
  }

  discover() {
    this.discovered = true
  }

  show(cx, cy, scale) {
    const cellColor = this.discovered ? color(255, 0, 0) : color(0, 255, 0)
    super.show(cx, cy, scale, cellColor, color(0))
  }
}
