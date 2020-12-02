import * as input from "./input";

/** A parameter read mode. */
type Mode = "position" | "immediate" | "relative";

/** A block of memory for an Intcode program execution. */
export class Memory {
  private values = new Map<number, number>();

  constructor(values: number[]) {
    values.forEach((v, i) => this.values.set(i, v));
  }

  /** Reads the value stored at the supplied address in this block of memory. */
  read(address: number): number {
    if (address >= 0) {
      return this.values.get(address) ?? 0;
    } else {
      throw new Error(`segfault (read) @ ${address}`);
    }
  }

  /** Writes the value stored at the supplied address in this block of memory. */
  write(address: number, value: number): void {
    if (address >= 0) {
      this.values.set(address, value);
    } else {
      throw new Error(`segfault (write) @ ${address}`);
    }
  }
}

/** Decodes the supplied value as an opcode and associated parameter read modes. */
function decode(value: number): [number, Mode[]] {
  const string = value.toString();
  if (string.length < 2) {
    return [value, []];
  } else {
    const opcode = parseInt(string.substr(string.length - 2));
    const modes = string
      .substr(0, string.length - 2)
      .split("")
      .map((c) => (c === "2" ? "relative" : c === "1" ? "immediate" : "position"))
      .reverse();
    return [opcode, modes];
  }
}

/** An executing Intcode program. */
export type Program = Generator<undefined, Memory, number | "exit">;

/** Starts executing the supplied Intcode program. */
export function start(
  initial: number[],
  output: (value: number) => void,
  overrides?: [number, number][],
): Program {
  const memory = new Memory(initial);
  for (const [address, value] of overrides ?? []) {
    memory.write(address, value);
  }

  return (function* () {
    let ip = 0;
    let base = 0;

    while (true) {
      const [opcode, modes] = decode(memory.read(ip));

      const readArg = (nth: number) => {
        const mode = modes[nth] ?? "position";
        const value = memory.read(ip + 1 + nth);
        switch (mode) {
          case "position":
            return memory.read(value);
          case "immediate":
            return value;
          case "relative":
            return memory.read(base + value);
        }
      };

      const writeArg = (nth: number, value: number) => {
        const mode = modes[nth] ?? "position";
        const address = memory.read(ip + 1 + nth);
        if (mode === "position") {
          memory.write(address, value);
        } else {
          memory.write(base + address, value);
        }
      };

      switch (opcode) {
        // add
        case 1:
          writeArg(2, readArg(0) + readArg(1));
          ip += 4;
          break;
        // multiply
        case 2:
          writeArg(2, readArg(0) * readArg(1));
          ip += 4;
          break;
        // input
        case 3:
          const input = yield;
          if (input === undefined) throw new Error(`missing input @ ${ip}`);
          if (input === "exit") return memory;
          writeArg(0, input);
          ip += 2;
          break;
        // output
        case 4:
          output(readArg(0));
          ip += 2;
          break;
        // jump-if-true
        case 5:
          if (readArg(0) !== 0) {
            ip = readArg(1);
          } else {
            ip += 3;
          }
          break;
        // jump-if-false
        case 6:
          if (readArg(0) === 0) {
            ip = readArg(1);
          } else {
            ip += 3;
          }
          break;
        // less-than
        case 7:
          writeArg(2, readArg(0) < readArg(1) ? 1 : 0);
          ip += 4;
          break;
        // equals
        case 8:
          writeArg(2, readArg(0) === readArg(1) ? 1 : 0);
          ip += 4;
          break;
        // adjust-relative-base
        case 9:
          base += readArg(0);
          ip += 2;
          break;
        // finish
        case 99:
          return memory;
        default:
          throw new Error(`unsupported opcode ${memory.read(ip)} @ ${ip}`);
      }
    }
  })();
}

/** Executes the supplied Intcode program. */
export function execute(
  memory: number[],
  input: () => number | "exit",
  output: (value: number) => void,
  overrides?: [number, number][],
): Memory {
  const program = start(memory, output, overrides);

  let next = program.next();
  while (!next.done) {
    next = program.next(input());
  }

  return next.value as Memory;
}
