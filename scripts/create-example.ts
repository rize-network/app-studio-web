import * as ts from 'typescript';
import * as fs from 'fs';

function generatePropFiles(componentName: string): void {
  const propsFilePath = `src/components/${componentName}/${componentName}/${componentName}.props.ts`;
  const examplesDirPath = `src/components/${componentName}/examples`;

  // Ensure the examples directory exists
  if (!fs.existsSync(examplesDirPath)) {
    fs.mkdirSync(examplesDirPath, { recursive: true });
  }

  // Create default example file
  createDefaultExampleFile(componentName, examplesDirPath);

  // Read the TypeScript file
  const sourceCode = fs.readFileSync(propsFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    propsFilePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  // Function to find the interface definition in the file and generate prop files
  const findPropsInterface = (node: ts.Node): void => {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.escapedText === `${componentName}Props`
    ) {
      node.members.forEach((member) => {
        if (
          ts.isPropertySignature(member) &&
          member.type &&
          (member.name as ts.Identifier).escapedText.toString() !== 'children'
        ) {
          const propName = (
            member.name as ts.Identifier
          ).escapedText.toString();
          const exampleFilePath = `${examplesDirPath}/${propName}.tsx`;

          // Check if the example file already exists
          if (!fs.existsSync(exampleFilePath)) {
            const propDemoContent = createPropDemoContent(
              componentName,
              propName
            );
            fs.writeFileSync(exampleFilePath, propDemoContent);
          }
        }
      });
    }

    ts.forEachChild(node, findPropsInterface);
  };

  // Parse the file to find the props interface
  findPropsInterface(sourceFile);
}

function createPropDemoContent(
  componentName: string,
  propName: string
): string {
  const ComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
  return `import React from 'react';
import { View } from 'app-studio';import { ${ComponentName} } from '../${ComponentName}';

export const ${
    propName.charAt(0).toUpperCase() + propName.slice(1)
  }Demo = () => {
  return (
    <${ComponentName} ${propName}={{}} >
      <View />
    </${ComponentName} >
  );
};
`;
}

function createDefaultExampleFile(
  componentName: string,
  examplesDirPath: string
) {
  const defaultFilePath = `${examplesDirPath}/default.tsx`;
  if (!fs.existsSync(defaultFilePath)) {
    const ComponentName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1);
    const defaultDemoContent = `import React from 'react';
import { ${ComponentName} } from '../${ComponentName}';

export const DefaultDemo = () => {
  return <${ComponentName} />;
};
`;

    fs.writeFileSync(defaultFilePath, defaultDemoContent);
  }
}

// Adjust this line to use command line arguments
const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name as an argument.');
  process.exit(1);
}

generatePropFiles(componentName);
