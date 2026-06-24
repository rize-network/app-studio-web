/**
 * Warms vite preview's file cache before Lighthouse runs. The first cold request
 * to a freshly-started static server can dip the score (~5-6 pts) purely as a
 * cache artifact; fetching the document and its assets first makes the measured
 * run representative of warm/real conditions.
 */
const origin = process.argv[2] || 'http://localhost:4173';

const html = await (await fetch(origin + '/')).text();
const assets = new Set();
for (const m of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css|woff2|webp|svg|png|ico))"/g)) {
  assets.add(m[1]);
}
await Promise.all(
  [...assets].map((a) => fetch(origin + a).catch(() => {}))
);
console.log(`warm: fetched / + ${assets.size} assets from ${origin}`);
