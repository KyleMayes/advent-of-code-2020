export function computeIfAbsent<K, V>(map: Map<K, V>, key: K, compute: () => V): V {
  let value = map.get(key);
  if (value === undefined) {
    value = compute();
    map.set(key, value);
  }
  return value;
}

export function computeIfPresent<K, V>(map: Map<K, V>, key: K, compute: (value: V) => V): V | null {
  let value = map.get(key);
  if (value !== undefined) {
    value = compute(value);
    map.set(key, value);
    return value;
  } else {
    return null;
  }
}

export function count<T>(values: T[]): Map<T, number> {
  const occurrences = new Map<T, number>();
  values.forEach((v) => merge(occurrences, v, 1, (a, b) => a + b));
  return occurrences;
}

export function merge<K, V>(map: Map<K, V>, key: K, value: V, merge: (a: V, b: V) => V): V {
  const old = map.get(key);
  value = old !== undefined ? merge(old, value) : value;
  map.set(key, value);
  return value;
}
