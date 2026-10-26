import { guidePages } from './pages/docs/docs.config';

const docModules = import.meta.glob('/docs/components/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const guideModules = import.meta.glob('/docs/guides/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export async function loadDocs() {
  const loadedDocs = Object.entries(docModules).map(([key, content]) => {
    const fileName =
      key
        .split('/')
        .pop()
        ?.replace(/\.[^/.]+$/, '') || '';
    const componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

    return {
      path: key,
      componentName,
      content,
    };
  });

  const guides = guidePages.map((guide) => ({
    ...guide,
    path: `/docs/guides/${guide.slug}.mdx`,
    componentName: guide.alias || guide.slug,
    content: guideModules[`/docs/guides/${guide.slug}.mdx`],
  }));

  return [
    ...guides,
    ...loadedDocs.sort((a, b) => {
      if (a.componentName < b.componentName) return -1;
      if (a.componentName > b.componentName) return 1;
      return 0;
    }),
  ];
}
