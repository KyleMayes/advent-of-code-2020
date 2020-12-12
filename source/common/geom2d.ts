/** A 2D point. */
export type Point2d = [number, number];

/** Converts a value from degrees to radians. */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/** Converts a value from radians to degrees. */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}

/** Returns whether the two supplied points are equal. */
export function eq2d(a: Point2d, b: Point2d): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

/** Returns the distance between the two supplied points. */
export function getDistance(a: Point2d, b: Point2d): number {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

/** Returns the Manhattan distance between the two supplied points. */
export function getManhattanDistance(a: Point2d, b: Point2d): number {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}

/** A vector defined by two points. */
export interface Vector2d {
  a: Point2d;
  b: Point2d;
  angle: number;
  length: number;
}

const axes = {
  "x-pos": 0,
  "y-pos": 90,
  "x-neg": 180,
  "y-neg": 270,
};

/** Returns the vector defined by the two supplied points. */
export function getVector(
  a: Point2d,
  b: Point2d,
  options?: {
    direction?: "clockwise" | "counterclockwise";
    distance?: "manhattan" | "default";
    axis?: "x-pos" | "x-neg" | "y-pos" | "y-neg";
  },
): Vector2d {
  let angle = Math.atan2(b[1] - a[1], b[0] - a[0]) * (180 / Math.PI);
  angle = (angle + 720 - axes[options?.axis ?? "x-pos"]) % 360;
  if (options?.direction === "clockwise") {
    angle = (360 - angle) % 360;
  }

  const length =
    (options?.distance ?? "manhattan") === "manhattan"
      ? getManhattanDistance(a, b)
      : getDistance(a, b);

  return { a, b, angle, length };
}

/** Rotates a point around another point (angle in degrees). */
export function rotate(center: Point2d, point: Point2d, angle: number): Point2d {
  const radians = degToRad(angle);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const rx = cos * (point[0] - center[0]) + sin * (point[1] - center[1]) + center[0];
  const ry = cos * (point[1] - center[1]) - sin * (point[0] - center[0]) + center[1];
  return [rx, ry];
}
