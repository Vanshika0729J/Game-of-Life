# Game of Life

A browser-based and desktop implementation of Conway's Game of Life, built with p5.js and wrapped as a desktop app using Electron. Cells are colored based on how long they've survived, creating a warm, glowing effect as patterns evolve.

## What is Conway's Game of Life?

A cellular automaton simulation where a grid of cells lives or dies each generation based on four simple rules:

1. A living cell with fewer than 2 neighbors dies (underpopulation)
2. A living cell with 2 or 3 neighbors survives
3. A living cell with more than 3 neighbors dies (overpopulation)
4. A dead cell with exactly 3 neighbors becomes alive (reproduction)

From these four rules alone, complex and often unpredictable patterns emerge — oscillators, gliders, and stable structures — despite there being no explicit instructions for any of them.

## Features

- Randomly seeded grid on startup
- Age-based coloring — cells shift color the longer they survive
- Click any cell to toggle it alive/dead
- Pause/resume the simulation with the spacebar
- Wrapping edges (a torus grid) — patterns that move off one edge reappear on the opposite side
- Runs as a standalone desktop app via Electron

## Controls

| Action | Control |
|---|---|
| Pause / resume | `Spacebar` |
| Toggle a cell alive/dead | Click on it |

## Tech stack

- [p5.js](https://p5js.org/) — rendering and animation loop
- [Electron](https://www.electronjs.org/) — desktop app wrapper
- Vanilla JavaScript — grid logic and simulation rules

## Running it locally

### Requirements
- [Node.js](https://nodejs.org/) installed

### Setup

```bash
git clone https://github.com/YOUR-USERNAME/game-of-life.git
cd game-of-life
npm install
npm start
```

This will open the simulation in its own desktop window.

## How it works

- The grid is stored as a 2D array, where each cell holds a number: `0` if dead, or its age (number of generations survived) if alive.
- Every frame, the simulation counts each cell's 8 neighbors and applies the four rules to compute the next generation into a separate array, then swaps it in — this avoids reading partially-updated data mid-calculation.
- Cell color is calculated using linear interpolation (`lerp`) between a "young" color and an "old" color, based on how close a cell's age is to a maximum age cap.

## Project structure

```
game-of-life/
├── index.html      # HTML page that loads the sketch
├── sketch.js        # Core simulation logic (grid, rules, rendering)
├── style.css         # Styling for the canvas/window
├── main.js          # Electron entry point, creates the app window
├── package.json      # Project config and dependencies
```

## Credits

Built as a Creative Coding project exploring simple rule-based systems and emergent complexity.