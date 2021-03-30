/* eslint-disable new-cap */

import p5 from "p5";

export class DisplayUnitVector {
  p5: p5;
  value: p5.Vector;
  length: number;
  margin: number;
  constructor(
    angle :number,
    magnitude : number ,
    length : number ,
    margin :number,
    _p5 : p5,
  ) {
    this.p5 = _p5;

    // The angle should be in radians.
    this.value = p5.Vector.fromAngle(this.p5.degrees(angle));
    this.value.setMag(magnitude);
    // If displaying in a grid, length is usually set to the
    // size of each cell in the grid

    this.length = length;
    this.margin = margin;
  }

  angle() : number{
    return this.value.heading();
  }

  setAngle(angle : number ) : void {
    this.value  = p5.Vector.fromAngle(this.p5.degrees(angle));
  }

  magnitude() : number{
    return this.value.mag();
  }

  show(x : number, y  : number, scale : number , mode = 'CORNER') : void {
    // const allowedModes = ['CORNER', 'CENTER'];
    // if (!allowedModes.includes(mode)) throw Error('Invalid mode');

    this.p5.push();
    this.p5.stroke(0);
    this.p5.strokeWeight(1);

    // Whether to use the provided `x` and `y` coordinates as
    // being the corners (an thus we have to translate to the center)
    // or directly the center coordinates
    if (mode === 'CORNER') {
      const centerX = x + 0.5 * scale;
      const centerY = y + 0.5 * scale;
      this.p5.translate(centerX, centerY);
    } else if (mode === 'CENTER') {
      this.p5.translate(x, y);
    }

    this.p5.rotate(this.angle());

    // Have the vector be of equal length on either side of the center
    const startX = -this.length / 2 + this.margin;
    const endX = this.length / 2 - this.margin;
    this.p5.line(startX, 0, endX, 0);

    // Arrow head
    const arrowProportion = 0.8;
    const arrowStartX = endX * arrowProportion;
    const arrowStartY = (1 - arrowProportion) * endX;
    this.p5.line(arrowStartX, arrowStartY, endX, 0);
    this.p5.line(arrowStartX, -arrowStartY, endX, 0);
    this.p5.pop();
  }
}
