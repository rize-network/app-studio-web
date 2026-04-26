// Load every component doc (.md / .mdx) at /docs/components as raw text.
// Vite resolves the glob at build time, so the docs page never has to fetch
// these files at runtime.
const docModules = import.meta.glob('/docs/components/*.{md,mdx}', {
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

  return loadedDocs.sort((a, b) => {
    if (a.componentName < b.componentName) return -1;
    if (a.componentName > b.componentName) return 1;
    return 0;
  });
}
