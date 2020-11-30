import { expect } from "chai";

import { Point2d, Vector2d, getVector } from "./geom2d";

const xPos: Point2d = [1, 0];
const xNeg: Point2d = [-1, 0];
const yPos: Point2d = [0, 1];
const yNeg: Point2d = [0, -1];

describe("geom2d/getVector", () => {
  it("works", () => {
    let vector: Vector2d;

    vector = getVector([0, 1], [5, 6]);
    expect(vector.a).to.have.ordered.members([0, 1]);
    expect(vector.b).to.have.ordered.members([5, 6]);
    expect(vector.angle).to.eq(45);
    expect(vector.length).to.eq(10);

    vector = getVector([0, 1], [5, 6], { distance: "default" });
    expect(vector.a).to.have.ordered.members([0, 1]);
    expect(vector.b).to.have.ordered.members([5, 6]);
    expect(vector.angle).to.eq(45);
    expect(vector.length).to.be.closeTo(7.07, 0.01);

    expect(getVector([0, 0], xPos).angle).to.eq(0);
    expect(getVector([0, 0], yPos).angle).to.eq(90);
    expect(getVector([0, 0], xNeg).angle).to.eq(180);
    expect(getVector([0, 0], yNeg).angle).to.eq(270);

    expect(getVector([0, 0], xNeg, { axis: "x-neg" }).angle).to.eq(0);
    expect(getVector([0, 0], yNeg, { axis: "x-neg" }).angle).to.eq(90);
    expect(getVector([0, 0], xPos, { axis: "x-neg" }).angle).to.eq(180);
    expect(getVector([0, 0], yPos, { axis: "x-neg" }).angle).to.eq(270);

    expect(getVector([0, 0], yPos, { axis: "y-pos" }).angle).to.eq(0);
    expect(getVector([0, 0], xNeg, { axis: "y-pos" }).angle).to.eq(90);
    expect(getVector([0, 0], yNeg, { axis: "y-pos" }).angle).to.eq(180);
    expect(getVector([0, 0], xPos, { axis: "y-pos" }).angle).to.eq(270);

    expect(getVector([0, 0], yNeg, { axis: "y-neg" }).angle).to.eq(0);
    expect(getVector([0, 0], xPos, { axis: "y-neg" }).angle).to.eq(90);
    expect(getVector([0, 0], yPos, { axis: "y-neg" }).angle).to.eq(180);
    expect(getVector([0, 0], xNeg, { axis: "y-neg" }).angle).to.eq(270);

    expect(getVector([0, 0], xPos, { direction: "clockwise" }).angle).to.eq(0);
    expect(getVector([0, 0], yNeg, { direction: "clockwise" }).angle).to.eq(90);
    expect(getVector([0, 0], xNeg, { direction: "clockwise" }).angle).to.eq(180);
    expect(getVector([0, 0], yPos, { direction: "clockwise" }).angle).to.eq(270);

    expect(getVector([0, 0], xNeg, { axis: "x-neg", direction: "clockwise" }).angle).to.eq(0);
    expect(getVector([0, 0], yPos, { axis: "x-neg", direction: "clockwise" }).angle).to.eq(90);
    expect(getVector([0, 0], xPos, { axis: "x-neg", direction: "clockwise" }).angle).to.eq(180);
    expect(getVector([0, 0], yNeg, { axis: "x-neg", direction: "clockwise" }).angle).to.eq(270);

    expect(getVector([0, 0], yPos, { axis: "y-pos", direction: "clockwise" }).angle).to.eq(0);
    expect(getVector([0, 0], xPos, { axis: "y-pos", direction: "clockwise" }).angle).to.eq(90);
    expect(getVector([0, 0], yNeg, { axis: "y-pos", direction: "clockwise" }).angle).to.eq(180);
    expect(getVector([0, 0], xNeg, { axis: "y-pos", direction: "clockwise" }).angle).to.eq(270);

    expect(getVector([0, 0], yNeg, { axis: "y-neg", direction: "clockwise" }).angle).to.eq(0);
    expect(getVector([0, 0], xNeg, { axis: "y-neg", direction: "clockwise" }).angle).to.eq(90);
    expect(getVector([0, 0], yPos, { axis: "y-neg", direction: "clockwise" }).angle).to.eq(180);
    expect(getVector([0, 0], xPos, { axis: "y-neg", direction: "clockwise" }).angle).to.eq(270);
  });
});
