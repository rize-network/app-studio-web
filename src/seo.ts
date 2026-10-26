import {
  componentReference,
  documentationComponents,
  findGuide,
  guidePages,
  normalizeDocName,
} from './pages/docs/docs.config';
import referenceNames from './pages/docs/component-reference-names.json';

export const SITE_URL = 'https://app-studio-6167b.web.app';
export const marketingPages = {
  '/components': {
    title: 'App Studio Components — React UI for web and native',
    description:
      'Composable React and React Native components, TypeScript APIs, theme tokens, and practical documentation. Build your next interface with App Studio Components.',
  },
  '/': {
    title: 'App Studio — Your styles. Your components. One API.',
    description:
      'Build React and React Native interfaces with typed style props, responsive layouts, theme tokens, and animations. Discover the App Studio styling engine.',
  },
};
export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}
const guidePath = (slug: string) =>
  slug === 'overview' ? '/docs' : `/docs/${slug}`;
export const publicPaths = [
  ...Object.keys(marketingPages),
  ...guidePages.map((guide) => guidePath(guide.slug)),
  '/docs/components',
  ...referenceNames.map((name) => `/docs/${name}`),
];
export const markdownPath = (path: string) =>
  path === '/' ? '/index.md' : `${path}.md`;

export function documentationBreadcrumbs(path: string) {
  const items = [
    { name: 'App Studio', path: '/' },
    { name: 'Documentation', path: '/docs' },
  ];
  if (path === '/docs') return items;
  const guide = path.startsWith('/docs/')
    ? findGuide(path.split('/')[2])
    : undefined;
  if (guide)
    return [...items, { name: guide.title, path: guidePath(guide.slug) }];
  items.push({ name: 'Components', path: '/docs/components' });
  if (path !== '/docs/components')
    items.push({ name: path.split('/').pop() || 'Examples', path });
  return items;
}

export function getPageMetadata(pathname: string): PageMetadata {
  const path = pathname.replace(/\/$/, '') || '/';
  const marketingPath = path === '/home' || path === '/app-studio' ? '/' : path;
  if (marketingPath in marketingPages)
    return {
      path: marketingPath,
      ...marketingPages[marketingPath as keyof typeof marketingPages],
    };
  if (path === '/docs/components')
    return {
      path,
      title: 'Component library — App Studio documentation',
      description:
        'Browse React and React Native components by category. Explore typed props, working examples, live playgrounds, and code you can copy into your project.',
    };
  if (path === '/docs' || /^\/docs\/[^/]+$/.test(path)) {
    const name = path.split('/')[2];
    const guide = findGuide(name);
    if (guide)
      return {
        path: guidePath(guide.slug),
        title: `${guide.title} — App Studio documentation`,
        description: guide.description,
      };
    const reference = referenceNames.find(
      (item) => normalizeDocName(item) === normalizeDocName(name || '')
    );
    if (reference)
      return {
        path: `/docs/${reference}`,
        title: `${reference} props, examples & playground — App Studio`,
        description: `Learn how to use ${reference} with App Studio. Explore its typed props, interactive examples, live playground, and copyable React code.`,
      };
  }
  const example = documentationComponents.find(
    (item) => item.examplePath === path
  );
  if (example)
    return {
      path,
      title: `${example.name} examples — App Studio`,
      description: `Try ${example.name} variants and interactions. Open its reference for typed props, a live playground, and code examples.`,
      noindex: !componentReference(example.name),
    };
  return {
    path,
    title: 'Page not found — App Studio',
    description:
      'Browse App Studio documentation, installation guides, and component references.',
    noindex: true,
  };
}

export function metadataTags(page: PageMetadata): Record<string, string>[] {
  return [
    { name: 'description', content: page.description },
    {
      name: 'robots',
      content: page.noindex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    },
    { property: 'og:site_name', content: 'App Studio' },
    {
      property: 'og:type',
      content: page.path.startsWith('/docs') ? 'article' : 'website',
    },
    { property: 'og:title', content: page.title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: SITE_URL + page.path },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image', content: `${SITE_URL}/icon-512.png` },
    {
      property: 'og:image:alt',
      content: 'App Studio — React components and styling framework',
    },
    { property: 'og:image:width', content: '512' },
    { property: 'og:image:height', content: '512' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: page.title },
    { name: 'twitter:description', content: page.description },
    { name: 'twitter:image', content: `${SITE_URL}/icon-512.png` },
    { name: 'twitter:image:alt', content: 'App Studio logo' },
  ];
}

export function structuredData(page: PageMetadata) {
  const core = {
    '@type': 'SoftwareSourceCode',
    '@id': SITE_URL + '/#framework',
    name: 'app-studio',
    description: marketingPages['/'].description,
    url: SITE_URL + '/',
    codeRepository: 'https://github.com/rize-network/app-studio',
    programmingLanguage: 'TypeScript',
    runtimePlatform: ['React', 'React Native'],
    license: 'https://github.com/rize-network/app-studio/blob/main/LICENSE',
  };
  const components = {
    '@type': 'SoftwareSourceCode',
    '@id': SITE_URL + '/components#library',
    name: '@app-studio/components',
    description: marketingPages['/components'].description,
    url: SITE_URL + '/components',
    codeRepository: 'https://github.com/rize-network/app-studio-components',
    programmingLanguage: 'TypeScript',
    runtimePlatform: ['React', 'React Native'],
    isBasedOn: { '@id': core['@id'] },
  };
  const docs = page.path.startsWith('/docs');
  return {
    '@context': 'https://schema.org',
    '@type':
      page.path === '/docs/components'
        ? 'CollectionPage'
        : docs
        ? 'TechArticle'
        : 'WebPage',
    '@id': SITE_URL + page.path + '#webpage',
    name: page.title,
    description: page.description,
    url: SITE_URL + page.path,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      name: 'App Studio',
      url: SITE_URL + '/',
    },
    about: docs
      ? [core, components]
      : page.path === '/components'
      ? components
      : core,
    ...(docs
      ? {
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: documentationBreadcrumbs(page.path).map(
              (item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: SITE_URL + item.path,
              })
            ),
          },
        }
      : {}),
  };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
export function renderMetadata(page: PageMetadata) {
  return (
    `<title>${escapeHtml(page.title)}</title>` +
    metadataTags(page)
      .map(
        (attributes) =>
          `<meta ${Object.entries(attributes)
            .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
            .join(' ')} />`
      )
      .join('') +
    `<link rel="canonical" href="${escapeHtml(SITE_URL + page.path)}" />` +
    (publicPaths.includes(page.path)
      ? `<link rel="alternate" type="text/markdown" href="${escapeHtml(
          SITE_URL + markdownPath(page.path)
        )}" />`
      : '') +
    `<link rel="describedby" type="text/plain" href="${SITE_URL}/llms.txt" />` +
    `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(
      structuredData(page)
    ).replace(/</g, '\\u003c')}</script>`
  );
}
