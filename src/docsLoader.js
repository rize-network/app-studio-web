export const loadDocs = () => {
  const context = require.context('./components', true, /\\.mdx?$/);
  const docs = context.keys().map((key) => {
    const componentName = key.split('/')[1]; // Supposons que le composant est dans src/components/ComponentName/
    const DocComponent = context(key).default;
    return {
      path: key,
      componentName,
      DocComponent,
    };
  });
  return docs;
};
