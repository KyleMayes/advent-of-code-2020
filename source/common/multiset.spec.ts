import { expect } from "chai";

import { Multiset } from "./multiset";

describe("multiset/Multiset", () => {
  it("can be constructed with no values", () => {
    const set = new Multiset<string>();
    expect(set.size).to.eq(0);
  });

  it("can be constructed with multiple values", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(set.size).to.eq(3);
    expect(set.get("A")).to.eq(2);
    expect(set.get("B")).to.eq(1);
  });

  it("can check for values", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(set.has("A")).to.eq(true);
    expect(set.has("B")).to.eq(true);
    expect(set.has("C")).to.eq(false);
  });

  it("can retrieve occurrence counts for values", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(set.get("A")).to.eq(2);
    expect(set.get("B")).to.eq(1);
    expect(set.get("C")).to.eq(0);
  });

  it("can have single value occurrences added", () => {
    const set = new Multiset<string>();
    expect(set.size).to.eq(0);

    expect(set.add("A")).to.eq(0);
    expect(set.size).to.eq(1);
    expect(set.get("A")).to.eq(1);

    expect(set.add("B")).to.eq(0);
    expect(set.size).to.eq(2);
    expect(set.get("A")).to.eq(1);
    expect(set.get("B")).to.eq(1);

    expect(set.add("A")).to.eq(1);
    expect(set.size).to.eq(3);
    expect(set.get("A")).to.eq(2);
    expect(set.get("B")).to.eq(1);
  });

  it("can have multiple value occurrences added", () => {
    const set = new Multiset<string>();
    expect(set.size).to.eq(0);

    expect(set.add("A", 2)).to.eq(0);
    expect(set.size).to.eq(2);
    expect(set.get("A")).to.eq(2);

    expect(set.add("B", 2)).to.eq(0);
    expect(set.size).to.eq(4);
    expect(set.get("A")).to.eq(2);
    expect(set.get("B")).to.eq(2);

    expect(set.add("A", 2)).to.eq(2);
    expect(set.size).to.eq(6);
    expect(set.get("A")).to.eq(4);
    expect(set.get("B")).to.eq(2);
  });

  it("can have single value occurrences deleted", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(set.size).to.eq(3);

    expect(set.delete("A")).to.eq(2);
    expect(set.size).to.eq(2);
    expect(set.get("A")).to.eq(1);
    expect(set.get("B")).to.eq(1);

    expect(set.delete("B")).to.eq(1);
    expect(set.size).to.eq(1);
    expect(set.get("A")).to.eq(1);
    expect(set.has("B")).to.eq(false);

    expect(set.delete("A")).to.eq(1);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);

    expect(set.delete("A")).to.eq(0);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);

    expect(set.delete("B")).to.eq(0);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);
  });

  it("can have multiple value occurrences deleted", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(set.size).to.eq(3);

    expect(set.delete("A", 2)).to.eq(2);
    expect(set.size).to.eq(1);
    expect(set.has("A")).to.eq(false);
    expect(set.get("B")).to.eq(1);

    expect(set.delete("B", 2)).to.eq(1);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);

    expect(set.delete("A", 2)).to.eq(0);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);

    expect(set.delete("B", 2)).to.eq(0);
    expect(set.size).to.eq(0);
    expect(set.has("A")).to.eq(false);
    expect(set.has("B")).to.eq(false);
  });

  it("can iterate over values", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    expect(Array.from(set.values())).to.have.members(["A", "B"]);
  });

  it("can iterate over entries", () => {
    const set = new Multiset<string>(["A", "B", "A"]);
    const entries = Array.from(set.entries());
    expect(entries).to.have.length(2);
    expect(entries[0][0]).to.eq("A");
    expect(entries[0][1]).to.eq(2);
    expect(entries[1][0]).to.eq("B");
    expect(entries[1][1]).to.eq(1);
  });
});
