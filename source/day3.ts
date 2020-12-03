import * as _ from "lodash";

import * as input from "./common/input";

const { grid, width, height } = input.grid("day3.txt");

function countTrees(dx: number, dy: number): number {
  let trees = 0;

  let x = dx;
  for (let y = dy; y < height; y += dy) {
    if (grid.read(x % width, y) === "#") {
      trees += 1;
    }

    x += dx;
  }

  return trees;
}

console.log(`Part 1: ${countTrees(3, 1)}`);

console.log(
  `Part 2: ${
    countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2)
  }`,
);
