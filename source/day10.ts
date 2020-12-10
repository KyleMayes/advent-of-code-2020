import * as _ from "lodash";

import * as input from "./common/input";

const adapters = _.sortBy(input.lines("day10.txt").map((l) => parseInt(l, 10)));

const finalAdapter = _.max(adapters)!! + 3;
adapters.push(finalAdapter);

function solvePart1(bag: number[], last: number, ones: number, threes: number): number | null {
  if (last === finalAdapter) {
    return ones * threes;
  }

  for (let i = 0; i < bag.length; ++i) {
    const diff = bag[i] - last;
    if (diff >= 1 && diff <= 3) {
      const bagClone = [...bag];
      bagClone.splice(i, 1);

      const one = diff === 1 ? 1 : 0;
      const three = diff === 3 ? 1 : 0;

      const result = solvePart1(bagClone, bag[i], ones + one, threes + three);
      if (result !== null) {
        return result;
      }
    } else {
      break;
    }
  }

  return null;
}

console.log(`Part 1: ${solvePart1(adapters, 0, 0, 0)}`);

const cache = new Map<number, number>();
function solvePart2(bag: number[], last: number, chains: number): number {
  if (cache.has(last)) {
    return cache.get(last)!!;
  }

  if (last === finalAdapter) {
    return chains + 1;
  }

  let additional = 0;

  for (let i = 0; i < bag.length; ++i) {
    const diff = bag[i] - last;
    if (diff >= 1 && diff <= 3) {
      const bagClone = [...bag];
      bagClone.splice(i, 1);
      additional += solvePart2(bagClone, bag[i], chains);
    }
  }

  const result = chains + additional;
  cache.set(last, result);
  return result;
}

console.log(`Part 2: ${solvePart2(adapters, 0, 0)}`);
