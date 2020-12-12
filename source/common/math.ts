/** Returns the greatest common divisor of the supplied numbers. */
export function gcd(numbers: number[]): number;
export function gcd(a: number, b: number): number;
export function gcd(a: number | number[], b?: number): number {
  if (typeof a === "number") {
    if (b === 0) return a;
    const remainder = a % b!;
    return gcd(b!, remainder);
  } else {
    return a.reduce((d, n) => gcd(d, n));
  }
}

/** Returns the least common multiple of the supplied numbers. */
export function lcm(numbers: number[]): number;
export function lcm(a: number, b: number): number;
export function lcm(a: number | number[], b?: number): number {
  if (typeof a === "number") {
    return (a * b!) / gcd(a, b!);
  } else {
    return a.reduce((m, n) => lcm(m, n));
  }
}

/** A mod operation that behaves like it does in math (no negative numbers) */
export function mod(i: number, n: number): number {
  return ((i % n) + n) % n;
}
