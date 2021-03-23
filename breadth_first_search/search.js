class BFS {
  constructor(gridCanvas) {
    // `root` and `end` are Cell types
    this.queue = []

    this.search = function (root, end) {
      this.queue.push(root)

      if (this.queue.length != 0) {
        const elem = this.queue.pop()
        if (elem === end) {
          console.log('DONE!')
          return end
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
            this.queue.push(neighbourCell)
            neighbourCell.show(neighbour.x, neighbour.y, gridCanvas.scale)
          }
        })
      }
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.discovered = false

    this.discover = function () {
      this.discovered = true
    }

    this.show = function (cx, cy, scale) {
      const cellColor = this.discovered ? color(255, 0, 0) : color(0, 255, 0)
      fill(cellColor)
      return rect(cx, cy, cx + scale, cy + scale)
    }
  }
}
