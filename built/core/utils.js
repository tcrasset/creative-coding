"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPalette = void 0;
class ColorPalette {
    constructor(_p5) {
        this.p5 = _p5;
        this.dieselBlue = this.p5.color(4, 101, 130);
        this.grey = this.p5.color(110, 117, 130);
        this.salmonPink = this.p5.color(243, 145, 137);
        this.offWhite = this.p5.color(220, 220, 220);
    }
}
exports.ColorPalette = ColorPalette;
