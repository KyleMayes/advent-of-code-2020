import * as _ from "lodash";

import * as input from "./common/input";

const numbers = input.lines("day1.txt").map((l) => parseInt(l, 10));

let part1 = 0;

const numbersSet = new Set(numbers);
for (const n of numbers) {
  if (numbersSet.has(2020 - n)) {
    part1 = n * (2020 - n);
    break;
  }
}

console.log(`Part 1: ${part1}`);

let part2 = 0;

const twoSumsSet = new Map();
for (const a of numbers) {
  for (const b of numbers) {
    twoSumsSet.set(a + b, a * b);
  }
}

for (const n of numbers) {
  const product = twoSumsSet.get(2020 - n);
  if (product !== undefined) {
    part2 = n * product;
    break;
  }
}

console.log(`Part 2: ${part2}`);
