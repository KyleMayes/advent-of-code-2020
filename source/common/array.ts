export function iota(start: number, end: number, step: number = 1): number[] {
  const numbers = [];
  for (let i = start; i < end; i += step) numbers.push(i);
  return numbers;
}

export function iota2d(
  start: [number, number],
  end: [number, number],
  step: [number, number] = [1, 1],
): [number, number][] {
  const cells: [number, number][] = [];

  for (let y = start[1]; y < end[1]; y += step[1]) {
    for (let x = start[0]; x < end[0]; x += step[0]) {
      cells.push([x, y]);
    }
  }

  return cells;
}

export function permute<T>(array: T[]): T[][] {
  if (array.length === 0) {
    return [];
  }

  const permutations: T[][] = [array];

  const stack = new Array(array.length).fill(0);
  for (let i = 0; i < array.length; ) {
    if (stack[i] < i) {
      array = array.slice();
      if (i % 2 === 0) {
        let tmp = array[0];
        array[0] = array[i];
        array[i] = tmp;
      } else {
        let tmp = array[stack[i]];
        array[stack[i]] = array[i];
        array[i] = tmp;
      }
      permutations.push(array);
      stack[i] += 1;
      i = 0;
    } else {
      stack[i] = 0;
      i += 1;
    }
  }

  return permutations;
}

export function streak<T>(items: T[], equal?: (a: T, b: T) => boolean): T[][] {
  if (items.length === 0) {
    return [];
  }

  equal = equal ?? ((a, b) => a === b);

  const streaks = [];

  let streak = [items[0]];
  let previous = items[0];
  for (const item of items.slice(1)) {
    if (equal(item, previous)) {
      streak.push(item);
    } else {
      streaks.push(streak);
      streak = [item];
      previous = item;
    }
  }

  if (streak.length !== 0) {
    streaks.push(streak);
  }

  return streaks;
}
