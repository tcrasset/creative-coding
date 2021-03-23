/* eslint-disable new-cap */
class DisplayUnitVector {
  constructor(
    angle = required(),
    magnitude = required(),
    length = required(),
    margin = required()
  ) {
    // If displaying in a grid, length is usually set to the
    // size of each cell in the grid
    // The angle should be in radians.
    this.value = new p5.Vector.fromAngle(degrees(angle))
    this.value.setMag(magnitude)
    this.length = length
    this.margin = margin

    this.angle = function () {
      return this.value.heading()
    }

    this.setAngle = function (angle = required()) {
      this.value = new p5.Vector.fromAngle(degrees(angle))
    }

    this.magnitude = function () {
      return this.value.mag()
    }

    this.show = function (
      x = required(),
      y = required(),
      scale = required(),
      mode = 'CORNER'
    ) {
      const allowedModes = ['CORNER', 'CENTER']

      if (!allowedModes.includes(mode)) throw Error('Invalid mode')
      push()
      stroke(0)
      strokeWeight(1)

      // Whether to use the provided `x` and `y` coordinates as
      // being the corners (an thus we have to translate to the center)
      // or directly the center coordinates
      if (mode === 'CORNER') {
        const centerX = x + 0.5 * scale
        const centerY = y + 0.5 * scale
        translate(centerX, centerY)
      } else if (mode === 'CENTER') {
        translate(x, y)
      }

      rotate(this.angle())

      // Have the vector be of equal length on either side of the center
      const startX = -this.length / 2 + margin
      const endX = this.length / 2 - margin
      line(startX, 0, endX, 0)

      // Arrow head
      const arrowProportion = 0.8
      const arrowStartX = endX * arrowProportion
      const arrowStartY = (1 - arrowProportion) * endX
      line(arrowStartX, arrowStartY, endX, 0)
      line(arrowStartX, -arrowStartY, endX, 0)
      pop()
    }
  }
}
