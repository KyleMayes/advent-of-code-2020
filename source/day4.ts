import * as _ from "lodash";

import * as input from "./common/input";

const chunks = input.chunks("day4.txt");

const passports = chunks.map((chunk) => {
  const passport: any = {};

  for (const piece of chunk.join(" ").split(/\s+/)) {
    let colon = piece.indexOf(":");
    passport[piece.substring(0, colon)] = piece.substring(colon + 1);
  }

  return passport;
});

let part1 = 0;
for (const p of passports) {
  if (Object.keys(p).length === 8 || (Object.keys(p).length === 7 && !p.cid)) {
    part1 += 1;
  }
}

console.log(`Part 1: ${part1}`);

let part2 = 0;
for (const p of passports) {
  if (
    (Object.keys(p).length === 8 || (Object.keys(p).length === 7 && !p.cid)) &&
    !!/^[0-9]{4}$/.exec(p.byr) &&
    parseInt(p.byr, 10) >= 1920 &&
    parseInt(p.byr, 10) <= 2002 &&
    !!/^[0-9]{4}$/.exec(p.byr) &&
    parseInt(p.iyr, 10) >= 2010 &&
    parseInt(p.iyr, 10) <= 2020 &&
    !!/^[0-9]{4}$/.exec(p.byr) &&
    parseInt(p.eyr, 10) >= 2020 &&
    parseInt(p.eyr, 10) <= 2030 &&
    !!/^#[0-9a-f]{6}$/.exec(p.hcl) &&
    ((!!/^\d+cm$/.exec(p.hgt) && parseInt(p.hgt, 10) >= 150 && parseInt(p.hgt, 10) <= 193) ||
      (!!/^\d+in$/.exec(p.hgt) && parseInt(p.hgt, 10) >= 59 && parseInt(p.hgt, 10) <= 76)) &&
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(p.ecl) !== -1 &&
    !!/^[0-9]{9}$/.exec(p.pid)
  ) {
    part2 += 1;
  }
}

console.log(`Part 2: ${part2}`);
