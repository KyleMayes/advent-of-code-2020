import { computeIfAbsent } from "./map";

/** A map which may store multiple values per key. */
export class Multimap<K, V> {
  private map = new Map<K, Set<V>>();

  /** Returns the inverse of the supplied map. */
  static inverse<K, V>(map: Map<K, V>): Multimap<V, K> {
    const multimap = new Multimap<V, K>();
    map.forEach((v, k) => multimap.addEntry(v, k));
    return multimap;
  }

  constructor(entries?: [K, V][]) {
    if (entries) {
      for (const [key, value] of entries) {
        this.addEntry(key, value);
      }
    }
  }

  /** The number of entries in this map. */
  get size(): number {
    let total = 0;
    this.map.forEach((vs) => (total += vs.size));
    return total;
  }

  /** Removes all entries from this map. */
  clear(): void {
    this.map.clear();
  }

  /** Returns whether this map contains the supplied entry. */
  hasEntry(key: K, value: V): boolean {
    return this.map.get(key)?.has(value) ?? false;
  }

  /** Returns whether this map contains an entry with the supplied key. */
  hasKey(key: K): boolean {
    return this.map.has(key);
  }

  /** Returns whether this map contains an entry with the supplied value. */
  hasValue(value: V): boolean {
    return Array.from(this.map.values()).some((vs) => vs.has(value));
  }

  /** Returns the keys in this map for the supplied key. */
  getKeys(value: V): Set<K> | undefined {
    const keys = new Set<K>();
    this.map.forEach((vs, k) => (vs.has(value) ? keys.add(k) : {}));
    return keys.size !== 0 ? keys : undefined;
  }

  /** Adds the supplied entry to this map. */
  addEntry(key: K, value: V): void {
    computeIfAbsent(this.map, key, () => new Set<V>()).add(value);
  }

  /** Returns the values in this map for the supplied key. */
  getValues(key: K): ReadonlySet<V> | undefined {
    return this.map.get(key);
  }

  /** Deletes the supplied entry from this map. */
  deleteEntry(key: K, value: V): boolean {
    const values = this.map.get(key);
    if (values) {
      const deleted = values.delete(value);
      if (values.size === 0) this.map.delete(key);
      return deleted;
    } else {
      return false;
    }
  }

  /** Deletes the values in this map for the supplied key. */
  deleteValues(key: K): ReadonlySet<V> | undefined {
    const values = this.map.get(key);
    this.map.delete(key);
    return values;
  }

  /** Returns the keys in this map. */
  keys(): Set<K> {
    return new Set(this.map.keys());
  }

  /** Returns the values in this map. */
  values(): Set<V> {
    const values = new Set<V>();
    this.map.forEach((vs) => vs.forEach((v) => values.add(v)));
    return values;
  }

  /** Returns the entries in this map. */
  entries(): [K, Set<V>][] {
    return Array.from(this.map.entries());
  }
}
