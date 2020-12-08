import { exec } from "child_process";
import * as _ from "lodash";

import * as input from "./common/input";

const instructions: [string, number][] = input.lines("day8.txt").map((line) => {
  const [opcode, argument] = line.split(" ");
  return [opcode, parseInt(argument, 10)];
});

function execute(instructions: [string, number][]): [number, boolean] {
  let ip = 0;
  let acc = 0;

  const seen = new Set<number>();

  while (true) {
    if (ip >= instructions.length) {
      return [acc, false];
    }

    if (seen.has(ip)) {
      return [acc, true];
    }

    seen.add(ip);

    const [opcode, argument] = instructions[ip];

    switch (opcode) {
      case "acc":
        acc += argument;
        ip += 1;
        break;
      case "nop":
        ip += 1;
        break;
      case "jmp":
        ip += argument;
        break;
    }
  }
}

console.log(`Part 1: ${execute(instructions)[0]}`);

let part2 = 0;

for (let i = 0; i < instructions.length; ++i) {
  const clone = _.cloneDeep(instructions);

  if (instructions[i][0] === "jmp") {
    clone[i][0] = "nop";
  } else if (instructions[i][0] === "nop") {
    clone[i][0] = "jmp";
  } else {
    continue;
  }

  const [acc, infinite] = execute(clone);
  if (!infinite) {
    part2 = acc;
    break;
  }
}

console.log(`Part 2: ${part2}`);
