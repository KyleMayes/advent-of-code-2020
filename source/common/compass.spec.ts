import { expect } from "chai";

import { getCardinal, getCardinalExt } from "./compass";

describe("compass/getCardinal", () => {
  it("works", () => {
    expect(getCardinal("N", 90)).to.equal("E");
    expect(getCardinal("N", 180)).to.equal("S");
    expect(getCardinal("N", 270)).to.equal("W");
    expect(getCardinal("N", 360)).to.equal("N");
    expect(getCardinal("N", 450)).to.equal("E");

    expect(getCardinal("N", -90)).to.equal("W");
    expect(getCardinal("N", -180)).to.equal("S");
    expect(getCardinal("N", -270)).to.equal("E");
    expect(getCardinal("N", -360)).to.equal("N");
    expect(getCardinal("N", -450)).to.equal("W");
  });
});

describe("compass/getCardinalExt", () => {
  it("works", () => {
    expect(getCardinalExt("N", 45)).to.equal("NE");
    expect(getCardinalExt("N", 90)).to.equal("E");
    expect(getCardinalExt("N", 135)).to.equal("SE");
    expect(getCardinalExt("N", 180)).to.equal("S");
    expect(getCardinalExt("N", 225)).to.equal("SW");
    expect(getCardinalExt("N", 270)).to.equal("W");
    expect(getCardinalExt("N", 315)).to.equal("NW");
    expect(getCardinalExt("N", 360)).to.equal("N");
    expect(getCardinalExt("N", 405)).to.equal("NE");

    expect(getCardinalExt("N", -45)).to.equal("NW");
    expect(getCardinalExt("N", -90)).to.equal("W");
    expect(getCardinalExt("N", -135)).to.equal("SW");
    expect(getCardinalExt("N", -180)).to.equal("S");
    expect(getCardinalExt("N", -225)).to.equal("SE");
    expect(getCardinalExt("N", -270)).to.equal("E");
    expect(getCardinalExt("N", -315)).to.equal("NE");
    expect(getCardinalExt("N", -360)).to.equal("N");
    expect(getCardinalExt("N", -405)).to.equal("NW");
  });
});
