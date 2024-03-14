import fs from 'fs';
import path from 'path';

// Replace 'componentName' with the actual component name
const componentName = 'Alert';
const pagePath = 'src/pages';
const componentPath = 'src/components';
// Directory paths
const componentExamplesDir = path.join(
  componentPath,
  componentName,
  'examples'
);

// Read files from the examples directory
fs.readdir(componentExamplesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter out non-TSX files
  const tsxFiles = files.filter(
    (file) => file.endsWith('.tsx') && file !== 'index.tsx'
  );

  // Generate import statement for all demo components
  const importStatement = `import { ${tsxFiles
    .map((file) => {
      const propName = file.replace('.tsx', '');
      return `${propName.charAt(0).toUpperCase() + propName.slice(1)}Demo`;
    })
    .join(', ')} } from "${componentPath}/${componentName}/examples";`;

  // Generate table rows for each prop
  const tableRows = tsxFiles
    .map((file) => {
      const propName = file.replace('.tsx', '');
      const propNameUppercase =
        propName.charAt(0).toUpperCase() + propName.slice(1);
      const propDemoComponent = `${propNameUppercase}Demo`;
      return `
      <tr>
        <td>${propNameUppercase}</td>
        <td><${propDemoComponent} /></td>
      </tr>`;
    })
    .join('\n');

  // Generate the page content
  const pageContent = `
    import React from 'react';
    import { View } from '${componentPath}';
    ${importStatement}

    const ${componentName}Page = () => {
      return (
        <View>
          <table className="table" cellSpacing={0}>
            <tbody>
              <tr>
                <th>Property</th>
                <th>App-Studio</th>
              </tr>
              ${tableRows}
            </tbody>
          </table>
        </View>
      );
    };

    export default ${componentName}Page;
  `;

  // Write the generated content to a new file
  const pageFilePath = path.join(
    pagePath,
    `${componentName.toLowerCase()}.page.tsx`
  );
  fs.writeFile(pageFilePath, pageContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(
        `${componentName.toLowerCase()}.page.tsx has been created successfully!`
      );
    }
  });
});
