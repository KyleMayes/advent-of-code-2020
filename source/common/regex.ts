/** A collection of values extracted from named capturing groups. */
export interface Captures {
  [key: string]: any;
}

/** Extracts the values from the named capturing groups in the supplied pattern. */
export function capture<C extends Captures>(
  pattern: RegExp,
  text: string,
  mappers: { [P in keyof C]: (key: string) => C[P] },
): C {
  const matches = pattern.exec(text);
  if (!matches) {
    throw new Error(`no match (${pattern}): '${text}'`);
  }

  const groups: { [key: string]: string } = (matches as any).groups;
  const values: any = {};

  for (const key of Object.keys(mappers)) {
    const value = groups[key];
    if (value) {
      values[key] = mappers[key](value);
    } else {
      throw new Error(`missing capture (${pattern}): '${key}'`);
    }
  }

  return values;
}
