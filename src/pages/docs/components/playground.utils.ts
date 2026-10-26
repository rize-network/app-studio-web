export interface PlaygroundControl {
  name: string;
  kind: 'boolean' | 'number' | 'string' | 'length' | 'enum' | 'json';
  initial?: string | number | boolean | object;
  options?: (string | number)[];
}
export interface PlaygroundDefinition {
  name: string;
  module: string;
  exportPath: string[];
  tag: number[];
  closeTag?: number[];
  insert: number;
  attributes: { name: string; start: number; end: number }[];
  children?: number[];
  controls: PlaygroundControl[];
  example: { code: string; exportName: string; file: string };
}
export type PlaygroundValues = Record<
  string,
  string | number | boolean | object
>;

export function parseControlValue(
  control: PlaygroundControl,
  raw: string | boolean
) {
  if (control.kind === 'boolean') {
    if (typeof raw !== 'boolean') throw new Error('Choose on or off.');
    return raw;
  }
  if (typeof raw !== 'string') throw new Error('Enter a text value.');
  if (control.kind === 'number') {
    if (!raw.trim() || !Number.isFinite(Number(raw)))
      throw new Error('Enter a finite number.');
    return Number(raw);
  }
  if (control.kind === 'enum') {
    const value = JSON.parse(raw);
    if (!control.options?.includes(value))
      throw new Error('Choose an available value.');
    return value as string | number;
  }
  if (control.kind === 'json') {
    const value = JSON.parse(raw, (key, value) => {
      if (
        [
          '__proto__',
          'constructor',
          'prototype',
          'dangerouslySetInnerHTML',
        ].includes(key)
      )
        throw new Error('Use styling properties in this object.');
      return value;
    });
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw new Error('Enter a JSON object.');
    return value as object;
  }
  return control.kind === 'length' && raw.trim() && Number.isFinite(Number(raw))
    ? Number(raw)
    : raw;
}

function replaceRanges(
  code: string,
  changes: { start: number; end: number; text: string }[]
) {
  return changes
    .sort((a, b) => b.start - a.start)
    .reduce(
      (result, change) =>
        result.slice(0, change.start) + change.text + result.slice(change.end),
      code
    );
}
export function playgroundPreviewCode(definition: PlaygroundDefinition) {
  return replaceRanges(
    definition.example.code,
    [definition.tag, definition.closeTag]
      .filter((range): range is number[] => Boolean(range))
      .map(([start, end]) => ({ start, end, text: '__PlaygroundTarget' }))
  );
}
export function playgroundCopyCode(
  definition: PlaygroundDefinition,
  values: PlaygroundValues
) {
  const changes: { start: number; end: number; text: string }[] = [];
  const attributes: string[] = [];
  for (const [name, value] of Object.entries(values)) {
    if (!definition.controls.some((control) => control.name === name))
      throw new Error(`Unknown playground prop: ${name}`);
    const literal = JSON.stringify(value);
    const attribute = definition.attributes.find((item) => item.name === name);
    if (attribute)
      changes.push({ start: attribute.start, end: attribute.end, text: '' });
    if (name === 'children' && definition.children)
      changes.push({
        start: definition.children[0],
        end: definition.children[1],
        text: `{${literal}}`,
      });
    else attributes.push(`${name}={${literal}}`);
  }
  if (attributes.length)
    changes.push({
      start: definition.insert,
      end: definition.insert,
      text: ' ' + attributes.join(' '),
    });
  return replaceRanges(definition.example.code, changes);
}
