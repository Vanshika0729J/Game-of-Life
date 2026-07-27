let cols, rows;
let resolution = 25;
let grid;
let paused = false;
let maxAge = 20; // age at which color stops changing further

function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  // randomly fill grid with alive/dead cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.random() > 0.65 ? 1 : 0;
    }
  }

}
/*
function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  placeGlider(5, 5);
}
*/
function draw() {
  background(0);

  // 1. Draw the current grid, colored by age
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let age = grid[i][j];

      if (age > 0) {
        // map age to a brown gradient: young cells are light tan, old cells are dark brown
        let ageFactor = min(age, maxAge) / maxAge;
        let r = lerp(210, 101, ageFactor);
        let g = lerp(180, 67, ageFactor);
        let b = lerp(140, 33, ageFactor);

        fill(r, g, b);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }

  if (paused) return;

  // 2. Compute the NEXT generation
  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let age = grid[i][j];
      let alive = age > 0;
      let neighbors = countNeighbors(grid, i, j);

      if (!alive && neighbors == 3) {
        next[i][j] = 1; // born this generation, age starts at 1
      } else if (alive && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0; // dies
      } else if (alive) {
        next[i][j] = age + 1; // survives, gets older
      } else {
        next[i][j] = 0; // stays dead
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      // count as a neighbor if age > 0 (alive), regardless of how old
      sum += grid[col][row] > 0 ? 1 : 0;
    }
  }
  return sum;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

function keyPressed() {
  if (key == ' ') {
    paused = !paused;
  }
}

function mousePressed() {
  let i = Math.floor(mouseX / resolution);
  let j = Math.floor(mouseY / resolution);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j] = grid[i][j] > 0 ? 0 : 1; // toggle: alive starts at age 1
  }
}

function placeGlider(x, y) {
  grid[x + 1][y] = 1;
  grid[x + 2][y + 1] = 1;
  grid[x][y + 2] = 1;
  grid[x + 1][y + 2] = 1;
  grid[x + 2][y + 2] = 1;
}