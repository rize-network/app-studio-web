import { promises as fs } from 'fs';
import path from 'path';

const createComponent = async (componentName: string) => {
  const componentDir = path.join('src/components', componentName);
  const innerComponentDir = path.join(componentDir, componentName);
  const examplesDir = path.join(componentDir, 'examples'); // Path for the examples directory

  // Create the component directories including the examples directory
  await fs.mkdir(innerComponentDir, { recursive: true });
  await fs.mkdir(examplesDir, { recursive: true }); // Create the examples directory

  // Create the `${componentName}.tsx` file directly under `src/components/componentName/`
  const componentContent = `import React from 'react';\nimport { View } from 'src/components';\nexport const ${componentName} = () => { return <View><View/></View>; };`;
  await fs.writeFile(
    path.join(componentDir, `${componentName}.tsx`),
    componentContent
  );

  // Define other files to create inside the inner component directory
  const files: [string, string][] = [
    [
      `${componentName}.props.ts`,
      `export interface ${componentName}Props {};\n`,
    ],
    [`${componentName}.type.ts`, `export type ${componentName}Type = {};\n`],
    [
      `${componentName}.view.tsx`,
      `import React from 'react';\nimport { View } from 'src/components';\nexport const ${componentName}View = () => { return <View></View>; };`,
    ],
    [`${componentName}.style.tsx`, `// Styles for ${componentName}`],
    [
      `${componentName}.state.ts`,
      `import { useState } from 'react';\n\nexport const use${componentName}State = () => {\n  const [isHovered, setIsHovered] = useState(false);\n  return { isHovered, setIsHovered };\n};\n`,
    ],
  ];

  // Create and write to the files in the inner component directory
  for (const [fileName, content] of files) {
    await fs.writeFile(path.join(innerComponentDir, fileName), content);
  }

  console.log(`Component ${componentName} created successfully.`);
};

// To run this script with a component name argument:
// ts-node src/createComponent.ts MyComponent
const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

createComponent(componentName).catch(console.error);
