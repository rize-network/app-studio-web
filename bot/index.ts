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

// AI Model Configuration - Default to gemini-2.5-flash for all operations
const PROPS_MODEL = process.env.PROPS_MODEL || 'gemini-2.5-flash';
const PROPS_PROVIDER = (process.env.PROPS_PROVIDER as ProviderType) || 'google'; // Cast to ProviderType
const COMMENT_MODEL = process.env.COMMENT_MODEL || 'gemini-2.5-flash';
const COMMENT_PROVIDER =
  (process.env.COMMENT_PROVIDER as ProviderType) || 'google'; // Cast to ProviderType
// --- End Configuration ---

/**
 * Get all component directories from the src/components folder
 */
async function getAllComponents(): Promise<string[]> {
  const componentsPath = BASE_COMPONENT_PATH;
  const entries = await fs.promises.readdir(componentsPath, {
    withFileTypes: true,
  });

  // Filter for directories only, excluding hidden directories and specific files
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort(); // Sort alphabetically for consistent processing
}

/**
 * Process a single component
 */
async function processComponent(
  componentName: string,
  componentFolder?: string
): Promise<boolean> {
  const folder =
    componentFolder || path.join(BASE_COMPONENT_PATH, componentName);
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
  if (!fs.existsSync(folder)) {
    console.error(
      `Component directory not found: ${folder}. Skipping ${componentName}.`
    );
    return false;
  }

  console.log(
    `\n=== Processing documentation for component: ${componentName} ===`
  );
  console.log(`Component Source: ${folder}`);
  console.log(`Props JSON Output: ${propsJsonPath}`);
  console.log(`Markdown Output: ${markdownOutputPath}`);

  // Use componentName as the cache key prefix for better organization
  const cacheKeyPrefix = componentName;
  const bot = new Bot(cacheKeyPrefix);
  const docuCode = new DocuCode(cacheKeyPrefix, COMMENT_MODEL, COMMENT_PROVIDER);

  try {
    // --- Step 1: Comment Generation (DocuCode) ---
    console.log(
      `\n[Step 1/3] Processing files for comments using ${COMMENT_PROVIDER}/${COMMENT_MODEL}...`
    );
    await docuCode.processDirectory(folder);
    console.log('[Step 1/3] Comment processing completed.');

    // --- Step 2: Props Data Generation (Bot) ---
    console.log(
      `\n[Step 2/3] Generating props data using ${PROPS_PROVIDER}/${PROPS_MODEL}...`
    );
    const propsData = await bot.generatePropsData(
      folder,
      componentName,
      PROPS_MODEL,
      PROPS_PROVIDER
    );

    if (!propsData) {
      console.error(
        '[Step 2/3] Failed to generate props data. Skipping subsequent steps.'
      );
      return false;
    }

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
      folder,
      componentName,
      propsData, // Pass the generated data
      markdownOutputPath // Pass the output path
    );
    console.log('[Step 3/3] Markdown generation completed.');

    console.log(
      `\n=== Documentation process for ${componentName} finished successfully ===`
    );
    return true;
  } catch (error) {
    console.error(
      `\n=== An error occurred during the documentation process for ${componentName} ===`
    );
    console.error(error);
    return false;
  }
}

async function main() {
  // If no component name is provided, process all components
  if (!componentName) {
    console.log(
      '\n🚀 No component specified - Processing ALL components with gemini-2.5-flash'
    );
    console.log(`📁 Base path: ${BASE_COMPONENT_PATH}`);
    console.log(`🤖 Model: ${PROPS_MODEL} (${PROPS_PROVIDER})\n`);

    const components = await getAllComponents();
    console.log(
      `📦 Found ${components.length} components to process:\n${components.join(', ')}\n`
    );

    const results = {
      successful: [] as string[],
      failed: [] as string[],
    };

    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      console.log(
        `\n[${i + 1}/${components.length}] Processing: ${component}`
      );

      const success = await processComponent(component);
      if (success) {
        results.successful.push(component);
      } else {
        results.failed.push(component);
      }

      // Add a small delay between components to avoid rate limiting
      if (i < components.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Print summary
    console.log('\n\n' + '='.repeat(70));
    console.log('📊 DOCUMENTATION GENERATION SUMMARY');
    console.log('='.repeat(70));
    console.log(`✅ Successful: ${results.successful.length} components`);
    if (results.successful.length > 0) {
      console.log(`   ${results.successful.join(', ')}`);
    }
    console.log(`\n❌ Failed: ${results.failed.length} components`);
    if (results.failed.length > 0) {
      console.log(`   ${results.failed.join(', ')}`);
    }
    console.log('='.repeat(70) + '\n');

    process.exit(results.failed.length > 0 ? 1 : 0);
  } else {
    // Process single component (existing behavior)
    console.log(`\n🚀 Processing single component: ${componentName}`);
    console.log(`🤖 Model: ${PROPS_MODEL} (${PROPS_PROVIDER})\n`);

    const success = await processComponent(componentName, componentArgFolder);
    process.exit(success ? 0 : 1);
  }
}

main().catch((error) => {
  console.error('\nUnhandled error during script execution:');
  console.error(error);
  process.exit(1);
});
