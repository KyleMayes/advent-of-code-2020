import * as _ from "lodash";

import { Grid2d } from "./common/grid2d";
import * as input from "./common/input";
import { computeIfAbsent } from "./common/map";

const { grid: ORIGINAL } = input.grid("day17.txt");

class Grid3d {
  cells = new Map<number, Grid2d<"#" | ".">>();

  clone(): Grid3d {
    const grid = new Grid3d();
    grid.cells = new Map(Array.from(this.cells.entries()).map(([k, v]) => [k, v.clone()]));
    return grid;
  }

  read(x: number, y: number, z: number): "#" | "." {
    const zlevel = this.cells.get(z);
    return zlevel?.read(x, y) ?? ".";
  }

  write(x: number, y: number, z: number, value: "#" | "."): void {
    const zlevel = computeIfAbsent(this.cells, z, () => new Grid2d<"#" | ".">());
    zlevel.write(x, y, value);
  }
}

function run3d(input: Grid3d): Grid3d {
  const grid = input.clone();

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (const level of grid.cells.values()) {
    const bbox = level.bbox();
    minX = Math.min(minX, bbox.minX);
    maxX = Math.max(maxX, bbox.maxX);
    minY = Math.min(minY, bbox.minY);
    maxY = Math.max(maxY, bbox.maxY);
  }

  minX -= 2;
  maxX += 2;
  minY -= 2;
  maxY += 2;

  const minZ = _.min(Array.from(grid.cells.keys()))!! - 1;
  const maxZ = _.max(Array.from(grid.cells.keys()))!! + 1;

  const newActive = [];
  const newInactive = [];
  for (let x = minX; x <= maxX; ++x) {
    for (let y = minY; y < maxY; ++y) {
      for (let z = minZ; z <= maxZ; ++z) {
        let active = 0;

        for (const dx of [-1, 0, 1]) {
          for (const dy of [-1, 0, 1]) {
            for (const dz of [-1, 0, 1]) {
              if (dx !== 0 || dy !== 0 || dz !== 0) {
                if (grid.read(x + dx, y + dy, z + dz) === "#") {
                  active += 1;
                }
              }
            }
          }
        }

        const current = grid.read(x, y, z);
        if (current === "#" && active !== 2 && active !== 3) {
          newInactive.push([x, y, z]);
        } else if (current !== "#" && active === 3) {
          newActive.push([x, y, z]);
        }
      }
    }
  }

  for (const [x, y, z] of newInactive) {
    grid.write(x, y, z, ".");
  }

  for (const [x, y, z] of newActive) {
    grid.write(x, y, z, "#");
  }

  return grid;
}

const grid3d = new Grid3d();
grid3d.cells.set(0, ORIGINAL as Grid2d<"#" | ".">);

let start3d = run3d(grid3d);
for (let i = 1; i < 6; ++i) {
  start3d = run3d(start3d);
}

let part1 = 0;
for (const level of start3d.cells.values()) {
  for (const [_p, value] of level.entries()) {
    if (value === "#") {
      part1 += 1;
    }
  }
}

console.log(`Part 1: ${part1}`);

class Grid4d {
  cells = new Map<number, Grid3d>();

  clone(): Grid4d {
    const grid = new Grid4d();
    grid.cells = new Map(Array.from(this.cells.entries()).map(([k, v]) => [k, v.clone()]));
    return grid;
  }

  read(x: number, y: number, z: number, w: number): "#" | "." {
    const wlevel = this.cells.get(w);
    return wlevel?.read(x, y, z) ?? ".";
  }

  write(x: number, y: number, z: number, w: number, value: "#" | "."): void {
    const wlevel = computeIfAbsent(this.cells, w, () => new Grid3d());
    wlevel.write(x, y, z, value);
  }
}

function run4d(input: Grid4d): Grid4d {
  const grid = input.clone();

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  let minZ = 0;
  let maxZ = 0;

  for (const hyperlevel of grid.cells.values()) {
    for (const level of hyperlevel.cells.values()) {
      const bbox = level.bbox();
      minX = Math.min(minX, bbox.minX);
      maxX = Math.max(maxX, bbox.maxX);
      minY = Math.min(minY, bbox.minY);
      maxY = Math.max(maxY, bbox.maxY);
    }

    minZ = Math.min(minZ, _.min(Array.from(hyperlevel.cells.keys()))!!);
    maxZ = Math.max(maxZ, _.max(Array.from(hyperlevel.cells.keys()))!!);
  }

  minX -= 2;
  maxX += 2;
  minY -= 2;
  maxY += 2;
  minZ -= 2;
  maxZ += 2;

  const minW = _.min(Array.from(grid.cells.keys()))!! - 1;
  const maxW = _.max(Array.from(grid.cells.keys()))!! + 1;

  const newActive = [];
  const newInactive = [];
  for (let x = minX; x <= maxX; ++x) {
    for (let y = minY; y < maxY; ++y) {
      for (let z = minZ; z <= maxZ; ++z) {
        for (let w = minW; w <= maxW; ++w) {
          let active = 0;

          for (const dx of [-1, 0, 1]) {
            for (const dy of [-1, 0, 1]) {
              for (const dz of [-1, 0, 1]) {
                for (const dw of [-1, 0, 1]) {
                  if (dx !== 0 || dy !== 0 || dz !== 0 || dw !== 0) {
                    if (grid.read(x + dx, y + dy, z + dz, w + dw) === "#") {
                      active += 1;
                    }
                  }
                }
              }
            }
          }

          const current = grid.read(x, y, z, w);
          if (current === "#" && active !== 2 && active !== 3) {
            newInactive.push([x, y, z, w]);
          } else if (current !== "#" && active === 3) {
            newActive.push([x, y, z, w]);
          }
        }
      }
    }
  }

  for (const [x, y, z, w] of newInactive) {
    grid.write(x, y, z, w, ".");
  }

  for (const [x, y, z, w] of newActive) {
    grid.write(x, y, z, w, "#");
  }

  return grid;
}

const grid4d = new Grid4d();
grid4d.cells.set(0, grid3d);

let start4d = run4d(grid4d);
for (let i = 1; i < 6; ++i) {
  start4d = run4d(start4d);
}

let part2 = 0;
for (const hyperlevel of start4d.cells.values()) {
  for (const level of hyperlevel.cells.values()) {
    for (const [_p, value] of level.entries()) {
      if (value === "#") {
        part2 += 1;
      }
    }
  }
}

console.log(`Part 2: ${part2}`);
