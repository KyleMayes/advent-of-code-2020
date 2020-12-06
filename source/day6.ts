import * as _ from "lodash";

import * as input from "./common/input";
import { Multiset } from "./common/multiset";

const chunks = input.chunks("day6.txt");

let part1 = 0;

for (const chunk of chunks) {
  const yes = new Set<string>();

  for (const line of chunk) {
    for (let i = 0; i < line.length; ++i) {
      yes.add(line.charAt(i));
    }
  }

  part1 += yes.size;
}

console.log(`Part 1: ${part1}`);

let part2 = 0;

for (const chunk of chunks) {
  const yes = new Multiset<string>();

  for (const line of chunk) {
    for (let i = 0; i < line.length; ++i) {
      yes.add(line.charAt(i));
    }
  }

  for (const [_question, count] of yes.entries()) {
    if (count === chunk.length) {
      part2 += 1;
    }
  }
}

console.log(`Part 2: ${part2}`);
