import { expect } from "chai";

import { Multimap } from "./multimap";

describe("multimap/Multimap", () => {
  it("can be constructed with no entries", () => {
    const map = new Multimap<number, string>();
    expect(map.size).to.eq(0);
  });

  it("can be constructed with multiple entries", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(map.size).to.eq(3);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A", "B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);
  });

  it("can check for entries", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(map.hasEntry(1, "A")).to.eq(true);
    expect(map.hasEntry(1, "B")).to.eq(true);
    expect(map.hasEntry(1, "C")).to.eq(false);
    expect(map.hasEntry(2, "A")).to.eq(true);
    expect(map.hasEntry(2, "B")).to.eq(false);
    expect(map.hasEntry(3, "A")).to.eq(false);
  });

  it("can check for keys", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(map.hasKey(1)).to.eq(true);
    expect(map.hasKey(2)).to.eq(true);
    expect(map.hasKey(3)).to.eq(false);
  });

  it("can check for values", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(map.hasValue("A")).to.eq(true);
    expect(map.hasValue("B")).to.eq(true);
    expect(map.hasValue("C")).to.eq(false);
  });

  it("can retrieve keys for values", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(Array.from(map.getKeys("A") ?? [])).to.have.members([1, 2]);
    expect(Array.from(map.getKeys("B") ?? [])).to.have.members([1]);
    expect(map.getKeys("C")).to.eq(undefined);
  });

  it("can retrieve values for keys", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A", "B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);
    expect(map.getValues(3)).to.eq(undefined);
  });

  it("can have entries added", () => {
    const map = new Multimap<number, string>();
    expect(map.size).to.eq(0);

    map.addEntry(1, "A");
    expect(map.size).to.eq(1);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A"]);

    map.addEntry(1, "A");
    expect(map.size).to.eq(1);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A"]);

    map.addEntry(2, "A");
    expect(map.size).to.eq(2);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    map.addEntry(2, "A");
    expect(map.size).to.eq(2);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    map.addEntry(1, "B");
    expect(map.size).to.eq(3);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A", "B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    map.addEntry(1, "B");
    expect(map.size).to.eq(3);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["A", "B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);
  });

  it("can have entries deleted", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);

    expect(map.deleteEntry(1, "A")).to.eq(true);
    expect(map.size).to.eq(2);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(map.deleteEntry(1, "A")).to.eq(false);
    expect(map.size).to.eq(2);
    expect(Array.from(map.getValues(1) ?? [])).to.have.members(["B"]);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(map.deleteEntry(1, "B")).to.eq(true);
    expect(map.size).to.eq(1);
    expect(map.hasKey(1)).to.eq(false);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(map.deleteEntry(1, "B")).to.eq(false);
    expect(map.size).to.eq(1);
    expect(map.hasKey(1)).to.eq(false);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(map.deleteEntry(2, "A")).to.eq(true);
    expect(map.size).to.eq(0);
    expect(map.hasKey(1)).to.eq(false);
    expect(map.hasKey(2)).to.eq(false);

    expect(map.deleteEntry(2, "A")).to.eq(false);
    expect(map.size).to.eq(0);
    expect(map.hasKey(1)).to.eq(false);
    expect(map.hasKey(2)).to.eq(false);
  });

  it("can have values deleted for keys", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);

    expect(Array.from(map.deleteValues(1) ?? [])).to.have.members(["A", "B"]);
    expect(map.size).to.eq(1);
    expect(map.hasKey(1)).to.eq(false);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(map.deleteValues(1)).to.eq(undefined);
    expect(map.size).to.eq(1);
    expect(map.hasKey(1)).to.eq(false);
    expect(Array.from(map.getValues(2) ?? [])).to.have.members(["A"]);

    expect(Array.from(map.deleteValues(2) ?? [])).to.have.members(["A"]);
    expect(map.size).to.eq(0);
    expect(map.hasKey(1)).to.eq(false);
    expect(map.hasKey(2)).to.eq(false);

    expect(map.deleteValues(2)).to.eq(undefined);
    expect(map.size).to.eq(0);
    expect(map.hasKey(1)).to.eq(false);
    expect(map.hasKey(2)).to.eq(false);
  });

  it("can iterate over keys", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(Array.from(map.keys())).to.have.members([1, 2]);
  });

  it("can iterate over values", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    expect(Array.from(map.values())).to.have.members(["A", "B"]);
  });

  it("can iterate over entries", () => {
    // prettier-ignore
    const map = new Multimap<number, string>([[1, "A"], [2, "A"], [1, "B"]]);
    const entries = Array.from(map.entries());
    expect(entries).to.have.length(2);
    expect(entries[0][0]).to.eq(1);
    expect(Array.from(entries[0][1])).to.have.members(["A", "B"]);
    expect(entries[1][0]).to.eq(2);
    expect(Array.from(entries[1][1])).to.have.members(["A"]);
  });
});
