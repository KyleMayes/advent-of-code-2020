import { expect } from "chai";

import { gcd, lcm } from "./math";

describe("math/gcd", () => {
  it("works", () => {
    expect(gcd(4, 1)).to.eq(1);
    expect(gcd(4, 17)).to.eq(1);
    expect(gcd(4, 322)).to.eq(2);
    expect(gcd([4, 322, 9000])).to.eq(2);
    expect(gcd([32, 120, 2048])).to.eq(8);
    expect(gcd([32, 120, 2048, 8192])).to.eq(8);
    expect(gcd([32, 120, 2048, 17])).to.eq(1);
    expect(gcd([32, 120, 2048, 8192, 17])).to.eq(1);
  });
});

describe("math/lcm", () => {
  it("works", () => {
    expect(lcm(4, 1)).to.eq(4);
    expect(lcm(4, 17)).to.eq(68);
    expect(lcm(4, 322)).to.eq(644);
    expect(lcm([4, 322, 9000])).to.eq(1449000);
    expect(lcm([1, 6, 18, 28, 44])).to.eq(2772);
  });
});
