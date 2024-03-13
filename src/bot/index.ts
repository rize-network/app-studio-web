import { Bot } from './Bot';
import { DocuCode } from './DocuCode';

async function main() {
  const projectName = 'MDX Documentation';
  const descriptionPath = 'docs/description.md';

  // Get componentName from command line arguments
  const componentName = process.argv[2]; // Assuming it's the first argument passed
  if (!componentName) {
    console.error('Please provide a component name as an argument.');
    process.exit(1);
  }

  console.log(`Generating documentation for component: ${componentName}`);

  const basePath = 'src/components';
  const propsPath = `src/data/props/${componentName}.props.json`;
  const componentFolder = `${basePath}/${componentName}`;
  const componentPath = `${basePath}/${componentName}/${componentName}`;

  const assistantGPT = new Bot(componentName);

  // Implementation for Documentation of the code
  console.log('Initializing documentation process...');
  const docuCode = new DocuCode(componentName);
  const assistantDocumentation = await assistantGPT.init(
    projectName,
    [],
    descriptionPath,
    'docu'
  );

  await docuCode.processDirectory(componentFolder, assistantDocumentation.id);

  // Generating props file for code
  console.log('Generating props file...');
  const { fileIds } = await assistantGPT.addFiles(componentPath);

  const assistantCreation = await assistantGPT.init(
    projectName,
    fileIds,
    descriptionPath,
    'props'
  );

  await assistantGPT.response(assistantCreation.id, propsPath);

  await assistantGPT.MarkdownGeneration(
    componentFolder,
    componentName,
    propsPath
  );

  console.log('Documentation generation completed.');
}

main().catch((error) => {
  console.error('Error during the execution of main:', error);
});
