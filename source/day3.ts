import * as _ from "lodash";
import { iota2d } from "./common/array";

import * as input from "./common/input";

const { grid, width, height } = input.grid("day3.txt");

function countTrees(dx: number, dy: number): number {
  // prettier-ignore
  return iota2d([dx, dy], [width + 1, height + 1], [dx, dy])
    .filter(([x, y]) => grid.read(x % width, y) === "#")
    .length;
}

console.log(`Part 1: ${countTrees(3, 1)}`);

console.log(
  `Part 2: ${
    countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2)
  }`,
);
