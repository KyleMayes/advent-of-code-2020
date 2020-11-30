import * as fs from "fs";
import * as path from "path";

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
    .filter(l => l.trim() !== "");
}

/** Reads the supplied input file and gets the non-empty lines. */
export function lines(input: string): string[] {
  return read(input)
    .split("\n")
    .map(l => l.trim())
    .filter(l => l !== "");
}

/** Reads the supplied input file and gets the non-empty comma-separated values for each line. */
export function linesCsv(input: string): string[][] {
  return lines(input).map(l => l.split(",").filter(l => l.trim() !== ""));
}
