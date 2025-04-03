import fs from 'fs';
import path from 'path'; // Import path
import { Bot } from './Bot';
import { DocuCode } from './DocuCode';
import { ProviderType } from './ai/ai.config';

// Load .env variables
require('dotenv').config();

// --- Configuration ---
// You can get these from process.argv, .env, or hardcode them
const componentName = process.argv[2]; // e.g., Button
const componentArgFolder = process.argv[3]; // Optional folder override

const BASE_COMPONENT_PATH = process.env.BASE_COMPONENT_PATH || 'src/components'; // Base path from env or default
const PROPS_DATA_FOLDER = process.env.PROPS_DATA_FOLDER || 'src/data/props'; // Props data output folder
const MARKDOWN_OUTPUT_FOLDER =
  process.env.MARKDOWN_OUTPUT_FOLDER || 'public/files/media'; // MDX output folder

// AI Model Configuration (can also be from .env or args)
const PROPS_MODEL = process.env.PROPS_MODEL || 'gpt-4o-mini';
const PROPS_PROVIDER = (process.env.PROPS_PROVIDER as ProviderType) || 'openai'; // Cast to ProviderType
const COMMENT_MODEL = process.env.COMMENT_MODEL || 'gpt-4o-mini';
const COMMENT_PROVIDER =
  (process.env.COMMENT_PROVIDER as ProviderType) || 'openai'; // Cast to ProviderType
// --- End Configuration ---

async function main() {
  if (!componentName) {
    console.error(
      'Usage: node <script_name>.js <ComponentName> [OptionalComponentFolder]'
    );
    process.exit(1);
  }

  const componentFolder =
    componentArgFolder || path.join(BASE_COMPONENT_PATH, componentName);
  const propsJsonPath = path.join(
    PROPS_DATA_FOLDER,
    `${componentName}.props.json`
  );
  const markdownOutputPath = path.join(
    MARKDOWN_OUTPUT_FOLDER,
    `${componentName}.mdx`
  );

  // Ensure output directories exist
  await fs.promises.mkdir(path.dirname(propsJsonPath), { recursive: true });
  await fs.promises.mkdir(path.dirname(markdownOutputPath), {
    recursive: true,
  });

  // Check if the component directory exists
  if (!fs.existsSync(componentFolder)) {
    console.error(
      `Component directory not found: ${componentFolder}. Please ensure the component exists.`
    );
    process.exit(1);
  }

  console.log(
    `\n=== Processing documentation for component: ${componentName} ===`
  );
  console.log(`Component Source: ${componentFolder}`);
  console.log(`Props JSON Output: ${propsJsonPath}`);
  console.log(`Markdown Output: ${markdownOutputPath}`);

  // Use componentName as the cache key prefix for better organization
  const cacheKeyPrefix = componentName;
  const bot = new Bot(cacheKeyPrefix);
  const docuCode = new DocuCode(cacheKeyPrefix);

  try {
    // --- Step 1: Comment Generation (DocuCode) ---
    console.log(
      `\n[Step 1/3] Processing files for comments using ${COMMENT_PROVIDER}/${COMMENT_MODEL}...`
    );
    await docuCode.processDirectory(componentFolder);
    console.log('[Step 1/3] Comment processing completed.');

    // --- Step 2: Props Data Generation (Bot) ---
    console.log(
      `\n[Step 2/3] Generating props data using ${PROPS_PROVIDER}/${PROPS_MODEL}...`
    );
    const propsData = await bot.generatePropsData(
      componentFolder,
      componentName,
      PROPS_MODEL,
      PROPS_PROVIDER
    );

    if (!propsData) {
      console.error(
        '[Step 2/3] Failed to generate props data. Skipping subsequent steps.'
      );
      // Decide whether to exit or continue without props data
      process.exit(1); // Exit if props are critical
    } else {
      // Write the generated props data to the JSON file
      await bot.fileHandler.writeFile(
        propsJsonPath,
        JSON.stringify(propsData, null, 2) // Pretty print JSON
      );
      console.log(
        `[Step 2/3] Props data generated and saved to ${propsJsonPath}.`
      );

      // --- Step 3: Markdown Generation (Bot) ---
      console.log('\n[Step 3/3] Generating Markdown documentation...');
      await bot.generateMarkdown(
        componentFolder,
        componentName,
        propsData, // Pass the generated data
        markdownOutputPath // Pass the output path
      );
      console.log('[Step 3/3] Markdown generation completed.');
    }

    console.log(
      `\n=== Documentation process for ${componentName} finished successfully ===`
    );
  } catch (error) {
    console.error(
      `\n=== An error occurred during the documentation process for ${componentName} ===`
    );
    console.error(error);
    process.exit(1); // Exit with error code
  }
}

main().catch((error) => {
  console.error('\nUnhandled error during script execution:');
  console.error(error);
  process.exit(1);
});
