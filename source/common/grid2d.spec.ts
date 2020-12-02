import { expect } from "chai";

import { Grid2d, Rectangle2d } from "./grid2d";

describe("grid2d/Grid2d", () => {
  it("can have read, write, and delete values", () => {
    const grid = new Grid2d<number>();

    expect(grid.read(0, 0)).to.eq(undefined);

    grid.write(0, 0, 4);
    expect(grid.read(0, 0)).to.eq(4);
    expect(grid.read(1, 0)).to.eq(undefined);
    expect(grid.read(0, 1)).to.eq(undefined);

    grid.write(1, 0, 17);
    expect(grid.read(0, 0)).to.eq(4);
    expect(grid.read(1, 0)).to.eq(17);
    expect(grid.read(0, 1)).to.eq(undefined);

    grid.write(0, 1, 322);
    expect(grid.read(0, 0)).to.eq(4);
    expect(grid.read(1, 0)).to.eq(17);
    expect(grid.read(0, 1)).to.eq(322);

    grid.write(0, 0, 322);
    expect(grid.read(0, 0)).to.eq(322);
    expect(grid.read(1, 0)).to.eq(17);
    expect(grid.read(0, 1)).to.eq(322);

    expect(grid.delete(0, 0)).to.eq(true);
    expect(grid.read(0, 0)).to.eq(undefined);
    expect(grid.read(1, 0)).to.eq(17);
    expect(grid.read(0, 1)).to.eq(322);

    expect(grid.delete(1, 0)).to.eq(true);
    expect(grid.read(0, 0)).to.eq(undefined);
    expect(grid.read(1, 0)).to.eq(undefined);
    expect(grid.read(0, 1)).to.eq(322);

    expect(grid.delete(0, 1)).to.eq(true);
    expect(grid.read(0, 0)).to.eq(undefined);
    expect(grid.read(1, 0)).to.eq(undefined);
    expect(grid.read(0, 1)).to.eq(undefined);

    expect(grid.delete(0, 0)).to.eq(false);
    expect(grid.delete(1, 0)).to.eq(false);
    expect(grid.delete(0, 1)).to.eq(false);
  });

  it("can iterate over entries", () => {
    const grid = new Grid2d<number>();
    grid.write(0, 0, 4);
    grid.write(1, 0, 17);
    grid.write(0, 1, 322);
    const entries = grid.entries();
    expect(entries).to.have.length(3);
    expect(entries[0]).to.deep.eq([[0, 0], 4]);
    expect(entries[1]).to.deep.eq([[1, 0], 17]);
    expect(entries[2]).to.deep.eq([[0, 1], 322]);
  });

  it("can determine the axis-aligned bounding box", () => {
    let bbox: Rectangle2d;

    const grid = new Grid2d<boolean>();
    bbox = grid.bbox();
    expect(bbox.minX).to.eq(0);
    expect(bbox.minY).to.eq(0);
    expect(bbox.maxX).to.eq(0);
    expect(bbox.maxY).to.eq(0);
    expect(bbox.width).to.eq(1);
    expect(bbox.height).to.eq(1);

    grid.write(3, 2, true);
    bbox = grid.bbox();
    expect(bbox.minX).to.eq(3);
    expect(bbox.minY).to.eq(2);
    expect(bbox.maxX).to.eq(3);
    expect(bbox.maxY).to.eq(2);
    expect(bbox.width).to.eq(1);
    expect(bbox.height).to.eq(1);

    grid.write(-3, 2, true);
    grid.write(3, -2, true);
    grid.write(-3, -2, true);
    grid.write(0, 0, false);
    bbox = grid.bbox();
    expect(bbox.minX).to.eq(-3);
    expect(bbox.minY).to.eq(-2);
    expect(bbox.maxX).to.eq(3);
    expect(bbox.maxY).to.eq(2);
    expect(bbox.width).to.eq(7);
    expect(bbox.height).to.eq(5);
  });

  it("can be printed to a string", () => {
    const grid = new Grid2d<boolean>();
    expect(grid.print((v) => (v ? "T" : "F"))).to.eq(" \n");

    grid.write(0, 0, false);
    expect(grid.print((v) => (v ? "T" : "F"), { fill: "-" })).to.eq("F\n");

    grid.write(3, 2, true);
    grid.write(-3, 2, true);
    grid.write(3, -2, true);
    grid.write(-3, -2, true);
    expect(grid.print((v) => (v ? "T" : "F"), { fill: "-" })).to.eq(
      `
T-----T
-------
---F---
-------
T-----T
`.trimLeft(),
    );
  });
});
