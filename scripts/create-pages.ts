import fs from 'fs';
import path from 'path';

const pagePath = 'src/pages';
const componentPath = 'src/components';

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const lowerFirstLetter = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Function to generate page content
const generateComponentPage = (
  componentName: string,
  examplesPath: string,
  componentPagePath: string
) => {
  // Read examples directory for the component
  fs.readdir(examplesPath, (err, files) => {
    if (err) {
      console.error(
        `Error reading examples directory for ${componentName}:`,
        err
      );
      return;
    }

    // Filter out non-TSX files
    const tsxFiles = files.filter(
      (file) => file.endsWith('.tsx') && file !== 'index.tsx'
    );

    // Generate a single import statement for all demo components
    const importStatement = `
    import React from 'react';
    import { View } from 'src/components/Layout/View/View';    import {\n${tsxFiles
      .map((file) => {
        const propName = file.replace('.tsx', '');
        return `  ${capitalizeFirstLetter(propName)}Demo,`;
      })
      .join('\n')}\n} from '${examplesPath}';`;

    // Generate table rows for each prop
    const tableRows = tsxFiles
      .map((file) => {
        const propName = file.replace('.tsx', '');
        const propNameUppercase = capitalizeFirstLetter(propName);
        return `
          <tr>
            <td>${propNameUppercase}</td>
            <td><${propNameUppercase}Demo /></td>
          </tr>`;
      })
      .join('\n');

    // Generate the page content
    const pageContent = `
        ${importStatement}

        const ${capitalizeFirstLetter(componentName)}Page = () => {
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

        export default ${capitalizeFirstLetter(componentName)}Page;
      `;

    // Write the generated content to a new file
    fs.writeFile(componentPagePath, pageContent, (err) => {
      if (err) {
        console.error(`Error writing ${componentPagePath}:`, err);
      } else {
        console.log(`${componentPagePath} has been created successfully!`);
      }
    });
  });
};

// Function to recursively create component pages
const createComponentPages = (directory: string) => {
  // Read directory
  fs.readdir(directory, (err, items) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    // Iterate through items in the directory
    items.forEach((item) => {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      // Check if item is a directory
      if (stats.isDirectory()) {
        const examplesPath = path.join(itemPath, 'examples');
        const componentPageName = `${lowerFirstLetter(item)}.page.tsx`;
        const componentPagePath = path.join(pagePath, componentPageName);

        // Check if the directory contains an examples folder
        if (
          fs.existsSync(examplesPath) &&
          fs.lstatSync(examplesPath).isDirectory()
        ) {
          // Check if the page already exists
          if (!fs.existsSync(componentPagePath)) {
            generateComponentPage(item, examplesPath, componentPagePath);
          } else {
            console.log(`${componentPageName} already exists.`);
          }
        } else {
          // Recursively call createComponentPages for subdirectories
          createComponentPages(itemPath);
        }
      }
    });
  });
};

// Start creating component pages from the components directory
createComponentPages(componentPath);
