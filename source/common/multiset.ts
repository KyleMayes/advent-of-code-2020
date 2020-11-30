import { merge } from "./map";

/** A set which may store multiple occurrences of the same value. */
export class Multiset<T> {
  private total = 0;
  private map = new Map<T, number>();

  constructor(values?: T[]) {
    if (values) {
      for (const value of values) {
        this.add(value);
      }
    }
  }

  /** The number of values in this set (including duplicate occurrences). */
  get size(): number {
    return this.total;
  }

  /** Removes all values from this set. */
  clear(): void {
    this.total = 0;
    this.map.clear();
  }

  /** Returns whether this set contains one or more occurrences of the supplied value. */
  has(value: T): boolean {
    return this.map.has(value);
  }

  /** Adds the supplied number of occurrences of the supplied value to this set. */
  add(value: T, occurrences: number = 1): number {
    this.total += occurrences;
    return merge(this.map, value, occurrences, (a, b) => a + b) - occurrences;
  }

  /** Returns the number of occurrences of the supplied value in this set. */
  get(value: T): number {
    return this.map.get(value) ?? 0;
  }

  /** Removes the supplied number of occurrences of the supplied value from this set. */
  delete(value: T, occurrences: number = 1): number {
    const previous = this.map.get(value) ?? 0;

    if (previous) {
      if (occurrences < previous) {
        this.total -= occurrences;
        this.map.set(value, previous - occurrences);
      } else {
        this.total -= previous;
        this.map.delete(value);
      }
    }

    return previous;
  }

  /** Returns the distinct values in this set. */
  values(): Set<T> {
    return new Set(this.map.keys());
  }

  /** Returns the distinct values and their number of occurrences in this set. */
  entries(): [T, number][] {
    return Array.from(this.map);
  }
}
