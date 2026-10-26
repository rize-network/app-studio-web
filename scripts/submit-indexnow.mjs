import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';

const key = readFileSync(
  new URL('../public/indexnow-key.txt', import.meta.url),
  'utf8'
).trim();
assert(/^[a-f0-9]{32}$/.test(key), 'Invalid public IndexNow ownership key.');
const $ = load(
  readFileSync(new URL('../build/sitemap.xml', import.meta.url), 'utf8'),
  { xml: true }
);
const urlList = $('loc')
  .map((_, element) => $(element).text())
  .get();
assert(
  urlList.length > 0 && urlList.length <= 10000,
  'Build the public sitemap before submitting.'
);
const origin = new URL(urlList[0]).origin;
assert(
  urlList.every(
    (url) => new URL(url).origin === origin && url.startsWith('https://')
  )
);
const keyLocation = origin + '/indexnow-key.txt';
const ownership = await fetch(keyLocation, {
  signal: AbortSignal.timeout(15000),
});
assert.equal(
  ownership.status,
  200,
  'Deploy the ownership file before submitting.'
);
assert.equal(
  (await ownership.text()).trim(),
  key,
  'The deployed ownership file differs from this build.'
);
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(origin).host,
    key,
    keyLocation,
    urlList,
  }),
  signal: AbortSignal.timeout(30000),
});
assert(
  [200, 202].includes(response.status),
  `IndexNow returned ${response.status}: ${(await response.text()).slice(
    0,
    400
  )}`
);
console.log(
  `IndexNow received ${urlList.length} URLs (HTTP ${response.status}). Receipt does not guarantee indexing or citations.`
);
