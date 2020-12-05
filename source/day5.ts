import * as _ from "lodash";

import * as input from "./common/input";

const lines = input.lines("day5.txt");

function parseId(pass: string): number {
    return parseInt(pass.replace(/(F|L)/g, "0").replace(/(B|R)/g, "1"), 2);
}

const ids = _.sortBy(lines.map(parseId));

console.log(`Part 1: ${_.max(ids)}`);

let part2 = 0;
for (let i = 0; i < ids.length; ++i) {
    if (i > 0 && i + 1 < ids.length && ids[i] != ids[i - 1] + 1) {
        part2 = ids[i] - 1;
        break;
    }
}

console.log(`Part 2: ${part2}`);
