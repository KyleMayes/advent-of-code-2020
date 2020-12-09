import * as _ from "lodash";

import * as input from "./common/input";

const numbers = input.lines("day9.txt").map((d) => parseInt(d, 10));

function solvePart1(preamble: number, numbers: number[]): number {
  outer: for (let i = preamble; i < numbers.length; ++i) {
    for (let j = Math.max(i - preamble, 0); j < numbers.length; ++j) {
      for (let k = Math.max(i - preamble + 1, 0); k < numbers.length; ++k) {
        if (j !== k && numbers[j] + numbers[k] === numbers[i]) {
          continue outer;
        }
      }
    }

    return numbers[i];
  }

  return -1;
}

const part1 = solvePart1(25, numbers);
console.log(`Part 1: ${solvePart1(25, numbers)}`);

let part2 = 0;

outer: for (let i = 0; i < numbers.length; ++i) {
  let sum = numbers[i];
  for (let j = i + 1; j < numbers.length; ++j) {
    sum += numbers[j];
    if (sum === part1) {
      part2 = _.max(numbers.slice(i, j))!! + _.min(numbers.slice(i, j))!!;
      break outer;
    } else if (sum > part1) {
      continue outer;
    }
  }
}

console.log(`Part 2: ${part2}`);
