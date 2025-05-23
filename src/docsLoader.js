export async function loadDocs() {
  try {
    // Use webpack's require.context to get all .md and .mdx files
    const context = require.context('../public', true, /\.mdx?$/);
    console.log('Processing key:', context);

    const docsPromises = context.keys().map(async (key) => {
      // console.log('Processing key:', key);

      // Extract the file name without extension and capitalize the first letter
      const fileName =
        key
          .split('/')
          .pop()
          ?.replace(/\.[^/.]+$/, '') || '';
      const componentName =
        fileName.charAt(0).toUpperCase() + fileName.slice(1);

      // console.log('Component Name:', componentName);

      // console.log({ import: `${key.slice(1)}` });
      // Dynamically import the documentation component
      // const module = await import(`${key.slice(1)}`);

      return {
        path: key.slice(1),
        componentName,
        // text,
      };
    });

    const loadedDocs = await Promise.all(docsPromises);

    // Sort the loaded docs array by componentName in ascending order
    const sortedDocs = loadedDocs.sort((a, b) => {
      if (a.componentName < b.componentName) return -1;
      if (a.componentName > b.componentName) return 1;
      return 0;
    });

    console.log('Final Docs Array:', sortedDocs);
    return sortedDocs;
  } catch (error) {
    console.error('Error loading docs:', error);
    return [];
  }
}
