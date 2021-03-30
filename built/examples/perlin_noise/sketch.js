"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable new-cap */
const p5_1 = __importDefault(require("p5"));
const gridCanvas_1 = require("../../core/gridCanvas");
const s = (sketch) => {
    const scale = 10;
    const cols = 100;
    const rows = 100;
    const noisiness = 0.003;
    let gridCanvas;
    const createRectangle = (cx, cy, scale) => {
        const noiseColor = sketch.map(sketch.noise(cx * noisiness, cy * noisiness), 0, 1, 0, 255);
        sketch.fill(sketch.color(noiseColor));
        sketch.noStroke();
        sketch.rect(cx, cy, cx + scale, cy + scale);
    };
    sketch.setup = () => {
        gridCanvas = new gridCanvas_1.GridCanvas(rows, cols, scale, sketch);
        gridCanvas.createCanvas();
        gridCanvas.draw2DGrid(createRectangle);
        sketch.noLoop();
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myp5 = new p5_1.default(s, "p5sketch");
