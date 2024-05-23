import fs from 'fs';
import { Bot } from './Bot';
import { DocuCode } from './DocuCode';

require('dotenv').config();

async function main() {
  // Get componentName from command line arguments
  const componentName = process.argv[2]; // Assuming it's the first argument passed
  const componentArgFolder = process.argv[3];

  if (!componentName) {
    console.error('Please provide a component name as an argument.');
    process.exit(1);
  }

  const descriptionPath = 'docs/description.md';
  const basePath = 'src/components';
  const componentFolder = componentArgFolder ?? `${basePath}/${componentName}`;

  const propsPath = `src/data/props/${componentName}.props.json`;

  // Check if the component directory exists
  if (!fs.existsSync(componentFolder)) {
    console.error(
      `Component directory not found for ${componentName}. Please ensure the component exists.`
    );
    process.exit(1);
  }

  console.log(
    `\n=== Generating documentation for component: ${componentName} ===`
  );

  // Initialize assistantGPT for commenting files
  console.log('\nInitializing documentation process...');
  const assistantGPT = new Bot(componentName);
  const docuCode = new DocuCode(componentName);

  // Initialize assistantGPT for DocuCode
  const { fileId } = await assistantGPT.addFile(descriptionPath);
  const assistantDocumentation = await assistantGPT.init(
    'AppStudio DocuCode',
    [fileId],
    'docu'
  );

  // Process directory for commenting
  console.log('\nProcessing files for annotation...');
  await docuCode.processDirectory(componentFolder, assistantDocumentation.id);
  console.log('Annotation process completed.');

  // Initialize assistantGPT for props generation
  console.log('\nGenerating props file...');
  const assistantCreation = await assistantGPT.init(
    'AppStudio MDXDoc',
    [],
    'props'
  );
  // Generate props file
  await assistantGPT.response(
    assistantCreation.id,
    propsPath,
    componentFolder,
    componentName
  );
}

main().catch((error) => {
  console.error('Error during the execution of main:', error);
});
