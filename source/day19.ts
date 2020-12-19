import * as _ from "lodash";

import * as input from "./common/input";

const chunks1 = input.chunks("day19p1.txt");
const chunks2 = input.chunks("day19p2.txt");

type Symbol = string | number[][];
type Rules = Map<number, Symbol>;

function parseSymbol(symbol: string): Symbol {
  if (symbol.startsWith('"')) {
    return symbol.replace(/"/g, "");
  } else {
    const alternatives = symbol.split(" | ");
    return alternatives.map((a) => a.split(" ").map((n) => parseInt(n, 10)));
  }
}

function parseRules(rules: string[]): Rules {
  return new Map(
    rules.map((rule) => {
      const [number, symbol] = rule.split(": ");
      console.log;
      return [parseInt(number, 10), parseSymbol(symbol)];
    }),
  );
}

const rules1 = parseRules(chunks1[0]);
const rules2 = parseRules(chunks2[0]);
const messages = chunks1[1];

function match(rules: Rules, message: string, stack: number[], history: number[]): number[] | null {
  if (message.length === 0 || stack.length === 0) {
    if (message.length === 0 && stack.length === 0) {
      return history;
    } else {
      return null;
    }
  }

  const next = rules.get(stack[0])!!;

  if (typeof next === "string") {
    if (message.startsWith(next)) {
      return match(rules, message.slice(1), stack.slice(1), [...history, stack[0]]);
    } else {
      return null;
    }
  }

  for (const alternative of next) {
    const result = match(
      rules,
      message,
      [...alternative, ...stack.slice(1)],
      [...history, stack[0]],
    );

    if (result) {
      return result;
    }
  }

  return null;
}

console.log(`Part 1: ${messages.filter((m) => match(rules1, m, [0], [])).length}`);
console.log(`Part 2: ${messages.filter((m) => match(rules2, m, [0], [])).length}`);
