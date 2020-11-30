import { expect } from "chai";

import { iota, permute, streak } from "./array";

describe("array/iota", () => {
  it("works", () => {
    expect(iota(0, -1)).to.have.ordered.members([]);
    expect(iota(0, 0)).to.have.ordered.members([]);
    expect(iota(0, 1)).to.have.ordered.members([0]);
    expect(iota(0, 2)).to.have.ordered.members([0, 1]);
  });
});

describe("array/permute", () => {
  it("works", () => {
    let permutations: number[][];

    permutations = permute([]);
    expect(permutations).to.have.length(0);

    permutations = permute([1]);
    expect(permutations).to.have.length(1);
    expect(permutations[0]).to.have.ordered.members([1]);

    permutations = permute([1, 2]);
    expect(permutations).to.have.length(2);
    expect(permutations[0]).to.have.ordered.members([1, 2]);
    expect(permutations[1]).to.have.ordered.members([2, 1]);

    permutations = permute([1, 2, 3]);
    expect(permutations).to.have.length(6);
    expect(permutations[0]).to.have.ordered.members([1, 2, 3]);
    expect(permutations[1]).to.have.ordered.members([2, 1, 3]);
    expect(permutations[2]).to.have.ordered.members([3, 1, 2]);
    expect(permutations[3]).to.have.ordered.members([1, 3, 2]);
    expect(permutations[4]).to.have.ordered.members([2, 3, 1]);
    expect(permutations[5]).to.have.ordered.members([3, 2, 1]);
  });
});

describe("array/streak", () => {
  it("works", () => {
    let streaks: number[][];

    streaks = streak([]);
    expect(streaks).to.have.length(0);

    streaks = streak([1]);
    expect(streaks).to.have.length(1);
    expect(streaks[0]).to.have.members([1]);

    streaks = streak([1, 1]);
    expect(streaks).to.have.length(1);
    expect(streaks[0]).to.have.members([1, 1]);

    streaks = streak([1, 2, 1]);
    expect(streaks).to.have.length(3);
    expect(streaks[0]).to.have.members([1]);
    expect(streaks[1]).to.have.members([2]);
    expect(streaks[2]).to.have.members([1]);

    streaks = streak([1, 1, 2, 2, 1, 1]);
    expect(streaks).to.have.length(3);
    expect(streaks[0]).to.have.members([1, 1]);
    expect(streaks[1]).to.have.members([2, 2]);
    expect(streaks[2]).to.have.members([1, 1]);
  });
});
