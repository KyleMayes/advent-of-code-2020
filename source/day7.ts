import * as _ from "lodash";

import * as input from "./common/input";

const lines = input.lines("day7.txt");

const rules = new Map<string, [number, string][]>();

for (const line of lines) {
  const [type, requirements] = line.split(" bags contain ");
  if (requirements !== "no other bags.") {
    rules.set(
      type,
      requirements.split(", ").map((r) => {
        const matches = /(\d+) (\w+ \w+) bag[s]?[\.]?/.exec(r)!!;
        return [parseInt(matches[1], 10), matches[2]];
      }),
    );
  } else {
    rules.set(type, []);
  }
}

const allowed = new Set<string>();

for (const [type, requirements] of rules.entries()) {
  if (requirements.find((r) => r[1] === "shiny gold")) {
    allowed.add(type);
  }
}

let added = false;
while (true) {
  added = false;

  for (const [type, requirements] of rules.entries()) {
    if (
      !allowed.has(type) &&
      Array.from(allowed).find((a) => requirements.find((r) => r[1] === a))
    ) {
      allowed.add(type);
      added = true;
    }
  }

  if (!added) {
    break;
  }
}

console.log(`Part 1: ${allowed.size}`);

let part2 = -1;

let stack: [number, string][] = [[1, "shiny gold"]];
while (stack.length !== 0) {
  let [number, type] = stack.pop()!!;
  part2 += number;
  for (const requirement of rules.get(type) ?? []) {
    stack.push([number * requirement[0], requirement[1]]);
  }
}

console.log(`Part 2: ${part2}`);
