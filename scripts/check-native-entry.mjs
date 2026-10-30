#!/usr/bin/env node
// Walks the import graph of the built React Native entry (as Metro resolves it:
// `<file>.native.js` before `<file>.js`) and fails when any reachable module
// imports a package a plain React Native runtime does not ship.
//
//   node scripts/check-native-entry.mjs [entry ...]
//
// Default entry: dist/native/components/index.native.js (the package's
// `react-native` root). Components that need more (zustand, formik, date-fns,
// react-dom, react-router-dom…) are only reachable through their explicit
// `@app-studio/components/native/<Name>` subpaths.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

const ALLOWED_PACKAGES = new Set([
  'react',
  'react-native',
  'app-studio',
  'react-native-svg',
  'lucide-react-native',
  'react-native-safe-area-context',
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-linear-gradient',
]);

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const entries = process.argv.slice(2);
if (entries.length === 0) entries.push('dist/native/components/index.native.js');

// `from '…'`, a side-effect `import '…'` at line start, `import('…')`, `require('…')`.
const SPECIFIER =
  /(?:\bfrom\s*|^\s*import\s*|\bimport\s*\(\s*|\brequire\s*\(\s*)['"]([^'"\n]+)['"]/gm;

function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

function isFile(path) {
  return existsSync(path) && statSync(path).isFile();
}

// Metro's order for a relative import: platform file, plain file, directory index.
function resolveRelative(fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier);
  const candidates = [
    `${base}.native.js`,
    `${base}.js`,
    `${base}/index.native.js`,
    `${base}/index.js`,
    base,
  ];
  return candidates.find(isFile);
}

function packageName(specifier) {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

let failures = 0;
for (const entry of entries) {
  const start = resolve(root, entry);
  if (!isFile(start)) {
    console.error(`✗ entry not found: ${entry} (run npm run build:native)`);
    failures += 1;
    continue;
  }
  const parent = new Map([[start, null]]);
  const queue = [start];
  const violations = new Map();
  while (queue.length > 0) {
    const file = queue.shift();
    const code = stripComments(readFileSync(file, 'utf8'));
    for (const [, specifier] of code.matchAll(SPECIFIER)) {
      if (specifier.startsWith('.')) {
        const target = resolveRelative(file, specifier);
        if (!target) {
          violations.set(`unresolved ${specifier}`, file);
        } else if (!parent.has(target)) {
          parent.set(target, file);
          queue.push(target);
        }
      } else if (!ALLOWED_PACKAGES.has(packageName(specifier))) {
        if (!violations.has(specifier)) violations.set(specifier, file);
      }
    }
  }
  if (violations.size === 0) {
    console.log(`✓ ${entry}: ${parent.size} modules, only ${[...ALLOWED_PACKAGES].join(', ')}`);
    continue;
  }
  failures += violations.size;
  console.error(`✗ ${entry}: ${violations.size} forbidden import(s)`);
  for (const [specifier, file] of violations) {
    const chain = [];
    for (let at = file; at; at = parent.get(at)) chain.unshift(relative(root, at));
    console.error(`  ${specifier}\n    via ${chain.join('\n      → ')}`);
  }
}
process.exit(failures === 0 ? 0 : 1);
