class BFS {
  constructor(gridCanvas = required(), root = required(), end = required()) {
    // `root` and `end` are Cell types
    root.discover()
    this.queue = [root]
    this.end = end
    this.isDone = false

    this.search = function () {
      if (this.queue.length != 0) {
        const elem = this.queue.shift()
        if (elem === this.end) {
          this.isDone = true
          return
        }

        const neighboursCoordinates = gridCanvas.neighbours(elem.x, elem.y)
        neighboursCoordinates.forEach((neighbour) => {
          const neighbourCell = gridCanvas.getGridElementAtCellIndex(
            neighbour.x,
            neighbour.y
          )
          if (!neighbourCell.discovered) {
            neighbourCell.discover()
            this.queue.push(neighbourCell)
          }
        })
      } else {
        console.log('No solution!')
        noLoop()
        return
      }
    }
  }
}
