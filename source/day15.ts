import * as _ from "lodash";

import * as input from "./common/input";
import { Progress } from "./common/progress";

const numbers = input
  .lines("day15.txt")[0]
  .split(",")
  .map((l) => parseInt(l, 10));

function play(turns: number): number {
  let turn = 1;

  const lastTurns = new Map<number, [number, number | undefined]>();
  const seen = new Set<number>();

  for (const number of numbers) {
    lastTurns.set(number, [turn, undefined]);
    seen.add(number);
    turn += 1;
  }

  let last = numbers[numbers.length - 1];
  seen.delete(last);

  const progress = new Progress(turns + 1);

  for (; turn <= turns; turn++) {
    let said;
    if (!seen.has(last)) {
      said = 0;
    } else {
      const [newer, older] = lastTurns.get(last)!!;
      said = newer!! - (older ?? 0);
    }

    lastTurns.set(said, [turn, lastTurns.get(said)?.[0]]);
    seen.add(last);
    last = said;

    progress.track(turn);
  }

  return last;
}

console.log(`Part 1: ${play(2020)}`);
console.log(`Part 2: ${play(30000000)}`);
