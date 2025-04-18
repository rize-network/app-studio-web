/**
 * Dark Mode Implementation Script
 *
 * This script automates the process of implementing dark mode support across all components.
 * It follows the pattern established in the Card component.
 */

const fs = require('fs');
const path = require('path');

// Base directory for components
const componentsDir = path.join(__dirname, '../src/components');

// List of components to update (from index.tsx)
const components = [
  // 'Accordion', 'Alert', 'AspectRatio', 'Avatar', 'Badge', 'Button', 'Card',
  // 'Carousel', 'Chart', 'ContextMenu', 'File', 'Link', 'Loader', 'Message',
  // 'Modal', 'NavigationMenu', 'Table', 'Tabs', 'Text', 'Toggle', 'ToggleGroup',
  // 'DragAndDrop', 'DropdownMenu', 'HoverCard', 'Menubar', 'Pagination',
  'Separator',
  'Sidebar',
  'Resizable',
  'Toast',
  'Command',
  'Tooltip',
  'Slider',
  'Uploader',
  'OTPInput',
];

// Form components
const formComponents = [
  'Select',
  'Switch',
  'TextArea',
  'TextField',
  'Checkbox',
  'CountryPicker',
  'DatePicker',
  'Password',
  'ComboBox',
];

// Function to update props file to add themeMode prop
function updatePropsFile(propsFilePath) {
  if (!fs.existsSync(propsFilePath)) {
    console.log(`Props file not found: ${propsFilePath}`);
    return false;
  }

  let content = fs.readFileSync(propsFilePath, 'utf8');

  // Check if themeMode prop already exists
  if (
    content.includes('themeMode?: string') ||
    content.includes('themeMode?:')
  ) {
    console.log(`themeMode prop already exists in ${propsFilePath}`);
    return false;
  }

  // Find the interface that extends ViewProps
  const interfaceMatch = content.match(
    /export\s+interface\s+\w+Props\s+extends\s+ViewProps\s*{[^}]*}/s
  );

  // If no interface extends ViewProps, look for any interface with Props in the name
  if (!interfaceMatch) {
    const altInterfaceMatch = content.match(
      /export\s+interface\s+\w+Props\s*{[^}]*}/s
    );

    if (!altInterfaceMatch) {
      console.log(`Could not find interface in ${propsFilePath}`);
      return false;
    }

    // Check if the file imports ViewProps
    if (!content.includes('ViewProps')) {
      // Add import for ViewProps if needed
      let updatedContent = content;
      const importMatch = content.match(/import\s+{([^}]*)}/);

      if (importMatch) {
        updatedContent = content.replace(
          /import\s+{([^}]*)}/,
          (match, imports) => {
            if (imports.includes('ViewProps')) {
              return match;
            }
            return `import {${imports.trim()}, ViewProps}`;
          }
        );
      } else {
        // If no import statement was found, add a new import
        updatedContent = `import { ViewProps } from 'app-studio';\n${content}`;
      }

      // Update the interface to extend ViewProps
      const updatedInterface = altInterfaceMatch[0].replace(
        /export\s+interface\s+(\w+Props)\s*{/,
        'export interface $1 extends ViewProps {'
      );

      updatedContent = updatedContent.replace(
        altInterfaceMatch[0],
        updatedInterface
      );

      // Now find the updated interface
      const newInterfaceMatch = updatedContent.match(
        /export\s+interface\s+\w+Props\s+extends\s+ViewProps\s*{[^}]*}/s
      );

      if (!newInterfaceMatch) {
        console.log(`Failed to update interface in ${propsFilePath}`);
        return false;
      }

      // Add themeMode prop before the closing brace
      const finalInterface = newInterfaceMatch[0].replace(
        /}$/,
        `\n  /**\n   * Optional theme mode override ('light' or 'dark')\n   * If not provided, the component will use the theme mode from context\n   */\n  themeMode?: string;\n}`
      );

      // Replace the interface in the content
      const finalContent = updatedContent.replace(
        newInterfaceMatch[0],
        finalInterface
      );

      // Write the updated content back to the file
      fs.writeFileSync(propsFilePath, finalContent);
      console.log(`Updated props file with ViewProps: ${propsFilePath}`);
      return true;
    }
  }

  // If we found an interface that extends ViewProps, add themeMode prop
  if (interfaceMatch) {
    // Add themeMode prop before the closing brace
    const updatedInterface = interfaceMatch[0].replace(
      /}$/,
      `\n  /**\n   * Optional theme mode override ('light' or 'dark')\n   * If not provided, the component will use the theme mode from context\n   */\n  themeMode?: string;\n}`
    );

    // Replace the interface in the content
    const updatedContent = content.replace(interfaceMatch[0], updatedInterface);

    // Write the updated content back to the file
    fs.writeFileSync(propsFilePath, updatedContent);
    console.log(`Updated props file: ${propsFilePath}`);
    return true;
  }

  console.log(`Could not update props file: ${propsFilePath}`);
  return false;
}

// Function to update style file to use theme mode
function updateStyleFile(styleFilePath) {
  if (!fs.existsSync(styleFilePath)) {
    console.log(`Style file not found: ${styleFilePath}`);
    return false;
  }

  let content = fs.readFileSync(styleFilePath, 'utf8');

  // Check if the file already uses theme mode
  if (content.includes("isDarkMode = themeMode === 'dark'")) {
    console.log(`Theme mode already implemented in ${styleFilePath}`);
    return false;
  }

  // Replace @media queries with theme-based styling
  let updatedContent = content.replace(
    /@media\s*\(prefers-color-scheme:\s*dark\)\s*{([^}]*)}/g,
    () => {
      // Replace with comment
      return '/* Dark mode styles handled through themeMode prop */';
    }
  );

  // Look for variant objects that need to be converted to functions
  const variantMatches = updatedContent.match(
    /export\s+const\s+\w+Variants\s*:\s*Record<[^>]+>\s*=\s*{[\s\S]*?};/g
  );
  if (variantMatches) {
    for (const variantMatch of variantMatches) {
      try {
        const variantName = variantMatch.match(
          /export\s+const\s+(\w+Variants)/
        )[1];
        const getVariantName = variantName.replace('Variants', '');

        // Extract the object content more safely
        const objectStart = variantMatch.indexOf('{');
        const objectEnd = variantMatch.lastIndexOf('}');

        if (objectStart !== -1 && objectEnd !== -1) {
          const objectContent = variantMatch.substring(
            objectStart,
            objectEnd + 1
          );
          const recordTypeMatch = variantMatch.match(/Record<([^>]+)>/);
          const recordType = recordTypeMatch
            ? recordTypeMatch[0]
            : 'Record<string, any>';

          // Create the function version
          const functionVersion = `export const get${getVariantName} = (themeMode: string): ${recordType} => {
  const isDarkMode = themeMode === 'dark';

  return ${objectContent}
  // Add dark mode conditional styling here
};

// For backward compatibility
export const ${variantName} = get${getVariantName}('light');`;

          // Replace the variant object with the function
          updatedContent = updatedContent.replace(
            variantMatch,
            functionVersion
          );
        } else {
          console.log(`Could not extract object content from ${variantName}`);
        }
      } catch (error) {
        console.log(
          `Error processing variant in ${styleFilePath}: ${error.message}`
        );
        // Continue with the next variant
      }
    }
  }

  // Write the updated content back to the file
  fs.writeFileSync(styleFilePath, updatedContent);
  console.log(`Updated style file: ${styleFilePath}`);
  return true;
}

// Function to update view file to use theme mode
function updateViewFile(viewFilePath) {
  if (!fs.existsSync(viewFilePath)) {
    console.log(`View file not found: ${viewFilePath}`);
    return false;
  }

  let content = fs.readFileSync(viewFilePath, 'utf8');

  // Check if the file already uses theme mode
  if (content.includes('themeMode: elementMode')) {
    console.log(`Theme mode already implemented in ${viewFilePath}`);
    return false;
  }

  // Add themeMode to props destructuring
  let updatedContent = content.replace(
    /export\s+const\s+\w+View\s*:\s*React\.FC<[^>]+>\s*=\s*\(\s*{([^}]*)}\s*\)\s*=>/g,
    (match, props) => {
      if (!props.includes('themeMode')) {
        return match.replace(
          props,
          `${props.trim()},\n  themeMode: elementMode`
        );
      }
      return match;
    }
  );

  // Add theme mode usage with useTheme hook
  updatedContent = updatedContent.replace(
    /const\s*{\s*([^}]*)\s*}\s*=\s*useTheme\(\);/g,
    (match, themeProps) => {
      if (!themeProps.includes('themeMode')) {
        return match.replace(themeProps, `${themeProps.trim()}, themeMode`);
      }
      return match;
    }
  );

  // Add currentThemeMode variable if it doesn't exist
  if (!updatedContent.includes('currentThemeMode')) {
    updatedContent = updatedContent.replace(
      /const\s*{\s*([^}]*themeMode[^}]*)\s*}\s*=\s*useTheme\(\);/g,
      (match) => {
        return `${match}\n  const currentThemeMode = elementMode || themeMode;`;
      }
    );
  }

  // Update getColor calls to use currentThemeMode
  updatedContent = updatedContent.replace(
    /getColor\(\s*([^,)]+)(?:\s*,\s*[^)]+)?\s*\)/g,
    (match, colorArg) => {
      if (!match.includes('currentThemeMode')) {
        return `getColor(${colorArg}, currentThemeMode)`;
      }
      return match;
    }
  );

  // Write the updated content back to the file
  fs.writeFileSync(viewFilePath, updatedContent);
  console.log(`Updated view file: ${viewFilePath}`);
  return true;
}

// Process a component
function processComponent(componentName, isFormComponent = false) {
  console.log(`\nProcessing component: ${componentName}`);

  try {
    let componentDir;
    if (isFormComponent) {
      componentDir = path.join(componentsDir, 'Form', componentName);
    } else {
      componentDir = path.join(componentsDir, componentName);
    }

    if (!fs.existsSync(componentDir)) {
      console.log(`Component directory not found: ${componentDir}`);
      return;
    }

    const componentSubDir = path.join(componentDir, componentName);
    if (!fs.existsSync(componentSubDir)) {
      console.log(`Component sub-directory not found: ${componentSubDir}`);
      return;
    }

    // Update props file
    const propsFile = path.join(componentSubDir, `${componentName}.props.ts`);
    if (fs.existsSync(propsFile)) {
      updatePropsFile(propsFile);
    } else {
      const altPropsFile = path.join(
        componentSubDir,
        `${componentName}.props.tsx`
      );
      if (fs.existsSync(altPropsFile)) {
        updatePropsFile(altPropsFile);
      } else {
        console.log(`Props file not found for ${componentName}`);
      }
    }

    // Update style file
    const styleFile = path.join(componentSubDir, `${componentName}.style.ts`);
    if (fs.existsSync(styleFile)) {
      updateStyleFile(styleFile);
    } else {
      const altStyleFile = path.join(
        componentSubDir,
        `${componentName}.style.tsx`
      );
      if (fs.existsSync(altStyleFile)) {
        updateStyleFile(altStyleFile);
      } else {
        console.log(`Style file not found for ${componentName}`);
      }
    }

    // Update view file
    const viewFile = path.join(componentSubDir, `${componentName}.view.tsx`);
    if (fs.existsSync(viewFile)) {
      updateViewFile(viewFile);
    } else {
      console.log(`View file not found for ${componentName}`);
    }

    console.log(`Completed processing ${componentName}`);
  } catch (error) {
    console.error(
      `Error processing component ${componentName}: ${error.message}`
    );
  }
}

// Main function
function main() {
  console.log('Starting dark mode implementation...');

  // Process regular components
  for (const component of components) {
    processComponent(component);
  }

  // Process form components
  for (const component of formComponents) {
    processComponent(component, true);
  }

  console.log('\nDark mode implementation complete!');
}

// Run the script
main();
