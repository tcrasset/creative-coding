import * as p5 from 'p5';

export class Cell {
  i: number;
  j: number;
  p5: p5;
  constructor(i : number, j : number, _p5: p5 ) {
    this.i = i;
    this.j = j;
    this.p5 = _p5;
  }

  public show(cx : number, cy : number, scale : number, fillColor : p5.Color | null = null, strokeColor : p5.Color | null = null) : void {
    strokeColor == null ? this.p5.noStroke() : this.p5.stroke(strokeColor);
    fillColor == null ? this.p5.noFill() : this.p5.fill(fillColor);
    this.p5.rect(cx, cy, cx + scale, cy + scale);
  }
}
