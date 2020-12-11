import * as _ from "lodash";

import * as input from "./common/input";
import { Grid2d, getDirections } from "./common/grid2d";

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

const { grid: ORIGINAL } = input.grid("day11.txt");

function solve(
  grid: Grid2d<string>,
  countOccupied: (grid: Grid2d<string>, x: number, y: number) => number,
  maxOccupied: number,
): number {
  while (true) {
    let stable = true;

    const newlyOccupied = [];
    const newlyEmpty = [];

    for (const [[x, y], value] of grid.entries()) {
      if (value === FLOOR) {
        continue;
      }

      const neighbors = countOccupied(grid, x, y);

      if (value === EMPTY && neighbors === 0) {
        newlyOccupied.push([x, y]);
      }

      if (value === OCCUPIED && neighbors >= maxOccupied) {
        newlyEmpty.push([x, y]);
      }
    }

    for (const [x, y] of newlyOccupied) {
      grid.write(x, y, OCCUPIED);
      stable = false;
    }

    for (const [x, y] of newlyEmpty) {
      grid.write(x, y, EMPTY);
      stable = false;
    }

    if (stable) {
      return grid.entries().filter(([_p, v]) => v === OCCUPIED).length;
    }
  }
}

function countOccupiedPart1(grid: Grid2d<string>, x: number, y: number): number {
  return grid.neighbors(x, y, true).filter(([_p, v]) => v === OCCUPIED).length;
}

console.log(`Part 1: ${solve(ORIGINAL.clone(), countOccupiedPart1, 4)}`);

function countOccupiedPart2(grid: Grid2d<string>, x: number, y: number): number {
  let neighbors = 0;

  for (const [dx, dy] of getDirections(true)) {
    const [_p, seat] = grid.raycast(x, y, dx, dy, (_p, v) => v !== FLOOR) ?? [];
    neighbors += seat === OCCUPIED ? 1 : 0;
  }

  return neighbors;
}

console.log(`Part 2: ${solve(ORIGINAL.clone(), countOccupiedPart2, 5)}`);
