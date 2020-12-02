import * as _ from "lodash";

import * as input from "./common/input";

const lines = input.lines("day2.txt");

let part1 = 0;

for (const line of lines) {
  let chunks = line.split(" ");

  let [l, h] = chunks[0].split("-");
  let low = parseInt(l);
  let high = parseInt(h);

  let letter = chunks[1].charAt(0);
  let password = chunks[2];

  let num = 0;
  for (const c of password) {
    if (c === letter) {
      num += 1;
    }
  }

  if (num >= low && num <= high) {
    part1 += 1;
  }
}

console.log(`Part 1: ${part1}`);

let part2 = 0;

for (const line of lines) {
  let chunks = line.split(" ");

  let [l, h] = chunks[0].split("-");
  let low = parseInt(l);
  let high = parseInt(h);

  let letter = chunks[1].charAt(0);
  let password = chunks[2];

  let a = password.charAt(low - 1) === letter ? 1 : 0;
  let b = password.charAt(high - 1) === letter ? 1 : 0;
  if (a + b === 1) {
    part2 += 1;
  }
}

console.log(`Part 2: ${part2}`);
