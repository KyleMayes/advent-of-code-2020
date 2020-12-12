import * as _ from "lodash";

import { Cardinal, getCardinal, getCardinalDelta } from "./common/compass";
import { getManhattanDistance, rotate } from "./common/geom2d";

import * as input from "./common/input";

type Opcode = Cardinal | "L" | "R" | "F";

const instructions: [Opcode, number][] = input.lines("day12.txt").map((line) => {
  const opcode = line.charAt(0);
  const argument = parseInt(line.substring(1), 10);
  return [opcode as Opcode, argument];
});

function solvePart1(): number {
  let direction: Cardinal = "E";
  let x = 0;
  let y = 0;

  for (const [opcode, argument] of instructions) {
    switch (opcode) {
      case "L":
        direction = getCardinal(direction, -argument);
        break;
      case "R":
        direction = getCardinal(direction, argument);
        break;
      case "F":
        const [fdx, fdy] = getCardinalDelta(direction);
        x += fdx * argument;
        y += fdy * argument;
        break;
      default:
        const [odx, ody] = getCardinalDelta(opcode);
        x += odx * argument;
        y += ody * argument;
        break;
    }
  }

  return getManhattanDistance([0, 0], [x, y]);
}

console.log(`Part 1: ${solvePart1()}`);

function solvePart2(): number {
  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;

  for (const [opcode, argument] of instructions) {
    switch (opcode) {
      case "L":
        [wx, wy] = rotate([x, y], [wx, wy], -argument);
        break;
      case "R":
        [wx, wy] = rotate([x, y], [wx, wy], argument);
        break;
      case "F":
        const fdx = argument * (wx - x);
        const fdy = argument * (wy - y);
        x += fdx;
        y += fdy;
        wx += fdx;
        wy += fdy;
        break;
      default:
        const [odx, ody] = getCardinalDelta(opcode);
        wx += odx * argument;
        wy += ody * argument;
        break;
    }
  }

  return getManhattanDistance([0, 0], [x, y]);
}

console.log(`Part 2: ${solvePart2()}`);
