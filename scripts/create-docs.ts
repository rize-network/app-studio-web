import simpleGit, { SimpleGit } from 'simple-git';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const git: SimpleGit = simpleGit();
const execAsync = promisify(exec);

const componentsDir: string = 'src/components';
const cacheDir: string = 'cache';

async function deleteComponentCache(componentName: string): Promise<void> {
  const componentCachePath = path.join(cacheDir, componentName);
  if (fs.existsSync(componentCachePath)) {
    await execAsync(`rm -rf "${componentCachePath}"`).catch((error) =>
      console.error(
        `Failed to delete cache for component: ${componentName}`,
        error
      )
    );
    console.log(`Deleted cache for component: ${componentName}`);
  }
}

async function createDocumentationForComponent(
  componentPath: string
): Promise<void> {
  const componentName = path.basename(componentPath);
  const mdFilePath = path.join(componentPath, `${componentName}.mdx`);

  if (fs.existsSync(mdFilePath)) {
    await deleteComponentCache(componentName);
    fs.unlinkSync(mdFilePath); // Direct deletion as we already checked existence
  }

  const command = `npm run bot-doc -- ${componentName}`;
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error(`Error in command output for ${componentName}:`, stderr);
      return;
    }
    console.log(`Documentation generated for ${componentName}:\n${stdout}`);
  } catch (error) {
    console.error(`Error executing command for ${componentName}:`, error);
  }
}

async function getChangedComponentsSinceLastCommit(): Promise<string[]> {
  try {
    const allChanges = await git.diff(['--name-only', 'HEAD~1..HEAD']);
    let componentSet = new Set<string>();

    allChanges.split('\n').forEach((file) => {
      if (file.startsWith(componentsDir) && !file.endsWith('.md')) {
        const parts = file.split(path.sep);
        const componentsIndex = parts.indexOf('components');
        if (componentsIndex !== -1 && parts.length > componentsIndex + 1) {
          const componentName = parts[componentsIndex + 1];
          const componentPath = path.join(componentsDir, componentName);
          componentSet.add(componentPath);
        }
      }
    });

    return Array.from(componentSet);
  } catch (error) {
    console.error('Failed to get changed components:', error);
    return [];
  }
}

async function main() {
  const changedComponents = await getChangedComponentsSinceLastCommit();
  console.log(changedComponents);
  if (changedComponents.length > 0) {
    console.log(
      'Generating documentation for new or changed components since last commit:'
    );
    for (const componentPath of changedComponents) {
      await createDocumentationForComponent(componentPath);
    }
  } else {
    console.log('No changes in components detected since the last commit.');
  }
}

main();
