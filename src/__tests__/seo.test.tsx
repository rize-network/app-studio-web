import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PageMetadata from 'src/pages/PageMetadata';
import {
  getPageMetadata,
  markdownPath,
  publicPaths,
  renderMetadata,
  SITE_URL,
} from 'src/seo';
import { load } from 'cheerio';

afterEach(cleanup);

test('every public page has unique indexable metadata and safe server-rendered head tags', () => {
  expect(new Set(publicPaths).size).toBe(publicPaths.length);
  const titles = new Set<string>();
  for (const path of publicPaths) {
    const page = getPageMetadata(path);
    expect(page.path).toBe(path);
    expect(page.noindex, path).not.toBe(true);
    expect(page.description.length, path).toBeGreaterThan(35);
    expect(titles.has(page.title), path).toBe(false);
    titles.add(page.title);
    const $ = load(renderMetadata(page));
    expect($('title')).toHaveLength(1);
    expect($('title').text()).toBe(page.title);
    expect($('meta[name="description"]')).toHaveLength(1);
    expect($('link[rel="canonical"]').attr('href')).toBe(SITE_URL + path);
    expect($('meta[property="og:url"]').attr('content')).toBe(SITE_URL + path);
    expect($('link[rel="alternate"][type="text/markdown"]').attr('href')).toBe(
      SITE_URL + markdownPath(path)
    );
    expect($('link[rel="describedby"]').attr('href')).toBe(
      SITE_URL + '/llms.txt'
    );
    expect(JSON.parse($('#site-structured-data').text()).url).toBe(
      SITE_URL + path
    );
  }
  expect(getPageMetadata('/docs/GettingStarted').path).toBe(
    '/docs/installation'
  );
  expect(getPageMetadata('/docs/AppStudio').path).toBe('/docs/core');
  expect(getPageMetadata('/').title).toBe(
    'App Studio — Your styles. Your components. One API.'
  );
  expect(getPageMetadata('/components').title).toContain(
    'App Studio Components'
  );
  expect(getPageMetadata('/app-studio').path).toBe('/');
  expect(publicPaths).toContain('/components');
  expect(publicPaths).not.toContain('/app-studio');
  expect(publicPaths).toContain('/docs/ai-assistants');
  expect(getPageMetadata('/docs/not-a-component').noindex).toBe(true);
  const $ = load(
    renderMetadata({
      path: '/docs',
      title: '<script>bad</script>',
      description: 'A "quoted" <description>',
    })
  );
  expect($('script')).toHaveLength(1);
  expect($('title').text()).toBe('<script>bad</script>');
});

test('client navigation replaces duplicate metadata instead of leaving an empty title', async () => {
  document.head.innerHTML =
    '<title></title><title>Old page</title><meta name="description" content="old"><meta name="description" content="duplicate">';
  render(
    <MemoryRouter initialEntries={['/docs/Button?variant=outline']}>
      <PageMetadata />
    </MemoryRouter>
  );
  await waitFor(() =>
    expect(document.title).toBe(getPageMetadata('/docs/Button').title)
  );
  expect(document.head.querySelectorAll('title')).toHaveLength(1);
  expect(
    document.head.querySelectorAll('meta[name="description"]')
  ).toHaveLength(1);
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    SITE_URL + '/docs/Button'
  );
  expect(
    document.head.querySelector('link[rel="alternate"][type="text/markdown"]')
  ).toHaveAttribute('href', SITE_URL + '/docs/Button.md');
});

test('structured data identifies the packages without invented claims and matches visible breadcrumbs', () => {
  const $ = load(renderMetadata(getPageMetadata('/docs/Button')));
  const schema = JSON.parse($('#site-structured-data').text());
  expect(schema['@type']).toBe('TechArticle');
  expect(schema.about.map((item: any) => item.name)).toEqual([
    'app-studio',
    '@app-studio/components',
  ]);
  expect(
    schema.breadcrumb.itemListElement.map((item: any) => item.name)
  ).toEqual(['App Studio', 'Documentation', 'Components', 'Button']);
  expect(schema.about[1].isBasedOn['@id']).toBe(schema.about[0]['@id']);
  expect(schema.about[1].license).toBeUndefined();
  expect(schema.about[0].aggregateRating).toBeUndefined();
});
