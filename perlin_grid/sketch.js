let scale = 20;
let cols = 40;
let rows = 40;

var gridCanvas;
function setup() {
  gridCanvas = new GridCanvas(rows, cols, scale);
  gridCanvas.createCanvas()

  let colors = makePerlinGrid(cols, rows)
  gridCanvas.draw2DGrid(colors);

}

function draw() {
}

function makePerlinGrid(cols, rows) {
  let colors = Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = y * cols + x;
      let noiseColor = map(noise(index), 0, 1, 0, 255);
      colors[index] = color(noiseColor);
    }
  }

  return colors;
}
