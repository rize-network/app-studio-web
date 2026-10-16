const htmlFiles = import.meta.glob('/design.md/html/*.html', { query: '?url', import: 'default', eager: true });
console.log(htmlFiles);
