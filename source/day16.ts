import * as _ from "lodash";

import * as input from "./common/input";
import { Multimap } from "./common/multimap";

const chunks = input.chunks("day16.txt");

type Rule = [number, number];
type Field = [string, Rule, Rule];
type Ticket = number[];

const fields: Field[] = chunks[0].map((f) => {
  const [name, rules] = f.split(": ");
  const [l, r] = rules.split(" or ");
  const r1 = l.split("-").map((i) => parseInt(i, 10));
  const r2 = r.split("-").map((i) => parseInt(i, 10));
  return [name, r1 as Rule, r2 as Rule];
});

const mine: Ticket = chunks[1][1].split(",").map((i) => parseInt(i, 10));
const others: Ticket[] = chunks[2].slice(1).map((t) => t.split(",").map((i) => parseInt(i, 10)));

function checkRule(rule: Rule, value: number): boolean {
  return value >= rule[0] && value <= rule[1];
}

function checkRules(field: Field, value: number): boolean {
  return checkRule(field[1], value) || checkRule(field[2], value);
}

const valid: Ticket[] = [];
const invalid: number[] = [];
for (const ticket of others) {
  let start = invalid.length;
  invalid.push(...ticket.filter((v) => fields.every((f) => !checkRules(f, v))));
  if (invalid.length === start) {
    valid.push(ticket);
  }
}

console.log(`Part 1: ${_.sumBy(invalid)}`);

valid.push(mine);

const candidates = new Multimap<string, number>();
for (const f of fields) {
  for (let slot = 0; slot < fields.length; ++slot) {
    if (valid.every((t) => checkRules(f, t[slot]))) {
      candidates.addEntry(f[0], slot);
    }
  }
}

const slots = new Map<string, number>();
while (candidates.size !== 0) {
  for (const [field, possibilities] of candidates.entries()) {
    if (possibilities.size === 1) {
      const slot = Array.from(possibilities)[0];
      slots.set(field, slot);
      candidates.deleteValues(field);
      for (const other of candidates.keys()) {
        candidates.deleteEntry(other, slot);
      }
    }
  }
}

const part2 = fields
  .map((f) => f[0])
  .filter((f) => f.startsWith("departure"))
  .map((f) => mine[slots.get(f)!!])
  .reduce((a, v) => a * v, 1);

console.log(`Part 2: ${part2}`);
