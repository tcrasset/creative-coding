class AStar {
  constructor(gridCanvas = required(), root = required(), end = required()) {
    // `root` and `end` are Cell types
    root.discover(null)
    this.gridCanvas = gridCanvas
    this.queue = [root]
    this.root = root
    this.end = end
    this.isDone = false

    this.openSet = new PriorityQueue()
    this.cameFrom = {} // Uses the cell index in the grid as index and value
    this.gScore = this._createInfinityMap()
    this.fScore = this._createInfinityMap()
    this.currentCell

    // Set path to root as 0
    const rootIndex = this.gridCanvas.cellIndexToArrayIndex(root.i, root.j)
    this.gScore[rootIndex] = 0

    // Set path from root to
    this.fScore[rootIndex] = this._heuristic(root, end)

    // Enqueue start node with priority f(rootIndex)
    this.openSet.enqueue(root, this.fScore[rootIndex])
  }

  _createInfinityMap() {
    const infMap = Array(this.gridCanvas.arrayLength)
    for (let index = 0; index < this.gridCanvas.arrayLength; index++) {
      infMap[index] = Infinity
    }
    return infMap
  }

  _heuristic(aCell, bCell) {
    // Manhattan distance
    return Math.abs(aCell.i - bCell.i) + Math.abs(aCell.j - bCell.j)
  }

  search() {
    if (!this.openSet.isEmpty()) {
      this.currentCell = this.openSet.removeLowest()
      this.currentCell.current = true
      if (this.currentCell === this.end) {
        this.isDone = true
        return
      }
      const neighbours = this._getNeighbours(this.currentCell)
      neighbours.forEach((neighbour) => {
        const currIndex = this.gridCanvas.cellIndexToArrayIndex(
          this.currentCell.i,
          this.currentCell.j
        )
        const neighbourIndex = this.gridCanvas.cellIndexToArrayIndex(
          neighbour.i,
          neighbour.j
        )
        const tentativeGScore =
          this.gScore[currIndex] + this._heuristic(this.currentCell, neighbour)

        if (tentativeGScore < this.gScore[neighbourIndex]) {
          this._updateScore(
            neighbourIndex,
            currIndex,
            tentativeGScore,
            neighbour
          )

          this._addNeighbour(neighbour)
        }
      })
    } else {
      console.log('NO SOLUTION')
      this.p5.noLoop()
    }
  }

  _addNeighbour(neighbour) {
    if (this.openSet.isIn(neighbour) == false) {
      neighbour.discover()
      this.openSet.enqueue(neighbour)
    }
  }

  _updateScore(neighbourIndex, currIndex, tentativeGScore, neighbour) {
    this.cameFrom[neighbourIndex] = currIndex
    this.gScore[neighbourIndex] = tentativeGScore
    this.fScore[neighbourIndex] =
      this.gScore[neighbourIndex] + this._heuristic(neighbour, this.end)
  }

  _getNeighbours(elem = required(), withDiagonals = false) {
    const neighbours = []
    const neighboursCoordinates = this.gridCanvas.neighbours(
      elem.i,
      elem.j,
      withDiagonals
    )

    neighboursCoordinates.forEach((neighbourCoord) => {
      const neighbour = this.gridCanvas.getGridElementAtCellIndex(
        neighbourCoord.x,
        neighbourCoord.y
      )
      neighbours.push(neighbour)
    })
    return neighbours
  }

  computePath() {
    let currIndex = this.gridCanvas.cellIndexToArrayIndex(
      this.currentCell.i,
      this.currentCell.j
    )

    const totalPath = [currIndex]

    while (Object.keys(this.cameFrom).includes(currIndex.toString())) {
      currIndex = this.cameFrom[currIndex]
      totalPath.unshift(currIndex)
    }

    totalPath.forEach((idx) => {
      const cell = this.gridCanvas.getGridElementAtArrayIndex(idx)
      cell.isOnPath = true
    })
  }
}

class AStarCell extends Cell {
  constructor(i = required(), j = required(), _p5 = required()) {
    super(i, j, _p5)
    this.discovered = false
    this.current = false
    this.isOnPath = false
  }

  discover() {
    this.discovered = true
  }

  show(cx, cy, scale) {
    let cellColor
    const cp = new ColorPalette(this.p5)

    if (this.isOnPath) {
      cellColor = cp.dieselBlue
    } else if (this.current) {
      cellColor = cp.salmonPink
    } else if (this.discovered) {
      cellColor = cp.grey
    } else {
      cellColor = cp.offWhite
    }
    super.show(cx, cy, scale, cellColor, this.p5.color(0))
  }
}
