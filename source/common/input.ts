import * as fs from "fs";
import * as path from "path";

import { Grid2d } from "./grid2d";

/** Reads the supplied input file. */
export function read(input: string, trim: boolean = true): string {
  const p = path.resolve(__dirname, "../../input", input);
  const contents = fs.readFileSync(p).toString("utf8");
  return trim ? contents.trim() : contents;
}

/** Reads the supplied input file and gets the non-empty comma-separated values. */
export function csv(input: string): string[] {
  return read(input)
    .split(",")
    .filter((l) => l.trim() !== "");
}

/** Reads the supplied input file and gets the non-empty lines. */
export function lines(input: string): string[] {
  return read(input)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");
}

/** Reads the supplied input file and gets the non-empty comma-separated values for each line. */
export function linesCsv(input: string): string[][] {
  return lines(input).map((l) => l.split(",").filter((l) => l.trim() !== ""));
}

/** Reads the supplied input file and treats the characters as cells in a 2D grid. */
export function grid(input: string): { grid: Grid2d<string>; width: number; height: number } {
  const grid = new Grid2d<string>();

  let width = 0;
  let height = 0;

  for (const line of lines(input)) {
    for (let x = 0; x < line.length; ++x) {
      grid.write(x, height, line.charAt(x));
    }

    width = Math.max(width, line.length);
    height += 1;
  }

  return { grid, width, height };
}
