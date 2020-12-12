import { indexMod } from "./array";

//================================================
// Cardinal
//================================================

/** A cardinal direction. */
export type Cardinal = "N" | "E" | "S" | "W";

/** The cardinal directions. */
export const cardinals: Cardinal[] = ["N", "E", "S", "W"];

/** Gets the new cardinal direction for a rotating entity (in degrees). */
export function getCardinal(cardinal: Cardinal, rotation: number): Cardinal {
  const start = cardinals.indexOf(cardinal);
  const steps = rotation / 90;
  return indexMod(cardinals, start + steps);
}

/** Gets the angle for a cardinal direction (as indicated on a compass). */
export function getCardinalAngle(cardinal: Cardinal): number {
  switch (cardinal) {
    case "N":
      return 0;
    case "E":
      return 90;
    case "S":
      return 180;
    case "W":
      return 270;
  }
}

/** Gets the X and Y offsets for a cardinal direction. */
export function getCardinalDelta(cardinal: Cardinal): [number, number] {
  switch (cardinal) {
    case "N":
      return [0, 1];
    case "S":
      return [0, -1];
    case "E":
      return [1, 0];
    case "W":
      return [-1, 0];
  }
}

//================================================
// Cardinal + Intercardinal
//================================================

/** A cardinal or intercardinal direction. */
export type CardinalExt = Cardinal | "NE" | "NW" | "SE" | "SW";

/** The cardinal and intercardinal directions. */
export const cardinalsExt: CardinalExt[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

/** Gets the new cardinal or intercardinal direction for a rotating entity (in degrees). */
export function getCardinalExt(cardinal: Cardinal, rotation: number): CardinalExt {
  const start = cardinalsExt.indexOf(cardinal);
  const steps = rotation / 45;
  return indexMod(cardinalsExt, start + steps);
}

/** Gets the angle for a cardinal or intercardinal direction (as indicated on a compass). */
export function getCardinalAngleExt(cardinal: CardinalExt): number {
  switch (cardinal) {
    case "NE":
      return 45;
    case "SE":
      return 135;
    case "SW":
      return 225;
    case "NW":
      return 315;
    default:
      return getCardinalAngleExt(cardinal);
  }
}

/** Gets the X and Y offsets for a cardinal or intercardinal direction. */
export function getCardinalDeltaExt(cardinal: CardinalExt): [number, number] {
  switch (cardinal) {
    case "NE":
      return [1, 1];
    case "NW":
      return [-1, 1];
    case "SE":
      return [1, -1];
    case "SW":
      return [-1, -1];
    default:
      return getCardinalDelta(cardinal);
  }
}
