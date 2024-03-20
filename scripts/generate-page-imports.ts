import { promises as fs } from 'fs';
import path from 'path';

// Define the directory containing the page components
const pagesDirectory = path.join('src/pages');
const outputFile = path.join('src/utils/componentsPageImports.tsx');

async function generateComponentImports() {
  try {
    const files = await fs.readdir(pagesDirectory);
    const imports: string[] = [];
    const componentListEntries: string[] = [];

    files.forEach((file) => {
      if (file.endsWith('.tsx') && !file.includes('componentsPageImports')) {
        // Ensure we're only processing TypeScript React files and avoid importing the current file itself
        const baseName = path.basename(file, '.tsx');
        const componentName = baseName.replace('.page', '');
        const importName = `${componentName
          .charAt(0)
          .toUpperCase()}${componentName.slice(1)}Page`;

        imports.push(
          `const ${importName} = lazy(() => import('src/pages/${baseName}'));`
        );
        componentListEntries.push(
          `{ name: '${componentName
            .charAt(0)
            .toUpperCase()}${componentName.slice(
            1
          )}', path: '/${componentName.toLowerCase()}', element: <${importName} /> }`
        );
      }
    });

    const outputContent = `
import React, { lazy } from 'react';
// Lazy-loaded imports
${imports.join('\n')}

export const componentList = [
  ${componentListEntries.join(',\n  ')}
];
    `;

    await fs.writeFile(outputFile, outputContent);
    console.log(
      `Components and imports have been successfully generated in ${outputFile}`
    );
  } catch (err) {
    console.error('Error generating component imports:', err);
  }
}

generateComponentImports();
