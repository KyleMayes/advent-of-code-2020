import { expect } from "chai";

import { computeIfAbsent, computeIfPresent, count, merge } from "./map";

describe("map/computeIfAbsent", () => {
  it("computes a value if absent", () => {
    const map = new Map<number, string>();
    expect(computeIfAbsent(map, 1, () => "A")).to.eq("A");
  });

  it("returns the value if present", () => {
    const map = new Map<number, string>([[1, "B"]]);
    expect(computeIfAbsent(map, 1, () => "A")).to.eq("B");
  });
});

describe("map/computeIfPresent", () => {
  it("computes a value if present", () => {
    const map = new Map<number, string>([[1, "A"]]);
    expect(computeIfPresent(map, 1, v => v + "B")).to.eq("AB");
  });

  it("returns null if absent", () => {
    const map = new Map<number, string>();
    expect(computeIfPresent(map, 1, v => v + "B")).to.eq(null);
  });
});

describe("map/count", () => {
  it("counts the occurrences of values", () => {
    const map = count(["A", "B", "A"]);
    expect(map).to.have.keys(["A", "B"]);
    expect(map.get("A")).to.eq(2);
    expect(map.get("B")).to.eq(1);
  });
});

describe("map/merge", () => {
  it("merges the current and initial values if present", () => {
    const map = new Map<number, string>([[1, "A"]]);
    expect(merge(map, 1, "A", v => v + "B")).to.eq("AB");
  });

  it("uses the initial value if absent", () => {
    const map = new Map<number, string>();
    expect(merge(map, 1, "A", v => v + "B")).to.eq("A");
  });
});
