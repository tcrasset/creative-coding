import * as p5 from 'p5';

export class ColorPalette {
  public p5: p5;
  public dieselBlue: p5.Color;
  public grey: p5.Color;
  public salmonPink: p5.Color;
  public offWhite: p5.Color;
  constructor(_p5 : p5) {
    this.p5 = _p5;
    this.dieselBlue = this.p5.color(4, 101, 130);
    this.grey = this.p5.color(110, 117, 130);
    this.salmonPink = this.p5.color(243, 145, 137);
    this.offWhite = this.p5.color(220, 220, 220);
  }
}
