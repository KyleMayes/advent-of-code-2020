import * as _ from "lodash";

import * as input from "./common/input";

const exprs = input.lines("day18.txt");

const part1 = (expr: string) => /(\d+) ([\+\*]) (\d+)/.exec(expr)!!;
const part2 = (expr: string) => /(\d+) (\+) (\d+)/.exec(expr) ?? /(\d+) (\*) (\d+)/.exec(expr)!!;

function evaluateBinary(expr: string, matcher: (expr: string) => RegExpExecArray): number {
  if (/^\d+$/.exec(expr)) {
    return parseInt(expr, 10);
  }

  const match = matcher(expr);
  const [m, left, operator, right] = match;

  const l = parseInt(left, 10);
  const r = parseInt(right, 10);
  const result = operator === "+" ? l + r : l * r;

  const prefix = expr.substring(0, match.index);
  const suffix = expr.substring(match.index + m.length);

  return evaluateBinary(prefix + result + suffix, matcher);
}

function evaluate(expr: string, matcher: (expr: string) => RegExpExecArray): number {
  let start = expr.indexOf("(");
  if (start === -1) {
    return evaluateBinary(expr, matcher);
  }

  let depth = 0;
  let end = -1;
  for (let i = start + 1; i < expr.length; ++i) {
    const c = expr.charAt(i);
    if (c === ")") {
      if (depth === 0) {
        end = i;
        break;
      } else {
        depth -= 1;
      }
    } else if (c === "(") {
      depth += 1;
    }
  }

  const result = evaluate(expr.substring(start + 1, end), matcher);

  const prefix = expr.substring(0, start);
  const suffix = expr.substring(end + 1);

  return evaluate(prefix + result + suffix, matcher);
}

function evaluateAll(exprs: string[], matcher: (expr: string) => RegExpExecArray): number {
  return _.sum(exprs.map((e) => evaluate(e, matcher)));
}

console.log(`Part 1: ${evaluateAll(exprs, part1)}`);
console.log(`Part 2: ${evaluateAll(exprs, part2)}`);
