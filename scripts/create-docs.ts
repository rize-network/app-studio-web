// import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import simpleGit, { SimpleGit } from 'simple-git';
const git: SimpleGit = simpleGit();
const execAsync = promisify(exec);

const componentsDir: string = 'src/components';
const cacheDir: string = 'cache';
const hashDir: string = 'hashes'; // Directory to store the hash files

// function generateMD5ForComponent(componentPath: string): string {
//   let hash = crypto.createHash('md5');
//   let files = fs.readdirSync(componentPath).sort();

//   files.forEach((file) => {
//     let filePath = path.join(componentPath, file);
//     if (fs.statSync(filePath).isFile()) {
//       let fileContent = fs.readFileSync(filePath);
//       hash.update(fileContent);
//     }
//   });

//   let digest = hash.digest('hex');
//   return digest;
// }

// function checkComponentChange(
//   componentPath: string,
//   storedHashPath: string
// ): boolean {
//   let currentHash = generateMD5ForComponent(componentPath);
//   let storedHash = fs.existsSync(storedHashPath)
//     ? fs.readFileSync(storedHashPath, 'utf8')
//     : null;

//   if (!storedHash || currentHash !== storedHash) {
//     fs.writeFileSync(storedHashPath, currentHash);
//     return true;
//   }

//   return false;
// }

async function deleteComponentCache(componentName: string): Promise<void> {
  const componentCachePath = path.join(cacheDir, componentName);
  if (fs.existsSync(componentCachePath)) {
    await execAsync(`rm -rf "${componentCachePath}"`);
    console.log(`Deleted cache for component: ${componentName}`);
  }
}
// async function runCommand(command: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(stderr);
//         reject(error.message);
//       } else {
//         console.log(stdout);
//         resolve(stdout);
//       }
//     });
//   });
// }

// async function createDocumentationForComponent(
//   componentPath: string
// ): Promise<void> {
//   const componentName = path.basename(componentPath);
//   const mdFilePath = path.join(componentPath, `${componentName}.md`);

//   if (fs.existsSync(mdFilePath)) {
//     await deleteComponentCache(componentName);
//     fs.unlinkSync(mdFilePath); // Direct deletion as we already checked existence
//   }

//   // Run bot-doc to generate the documentation
//   const botDocCommand = `npm run bot-doc -- ${componentName} ${componentPath}`;
//   await runCommand(botDocCommand);

//   // After bot-doc completes, run lint:fix to clean up any generated files
//   // const lintFixCommand = 'npm run lint:fix';
//   // await runCommand(lintFixCommand);

//   console.log(
//     `Documentation generated and linted for ${componentName}. Updating hash.`
//   );

//   // Update the hash after successful lint fix and documentation generation
//   // const storedHashPath = path.join(hashDir, `${componentName}.md5`);
//   // const newHash = generateMD5ForComponent(componentPath);
//   // fs.writeFileSync(storedHashPath, newHash);
// }

async function createDocumentationForComponent(
  componentPath: string
): Promise<void> {
  const componentName = path.basename(componentPath);
  const mdFilePath = path.join(componentPath, `${componentName}.mdx`);

  if (fs.existsSync(mdFilePath)) {
    await deleteComponentCache(componentName);
    await fs.unlinkSync(mdFilePath); // Direct deletion as we already checked existence
  }

  const command = `npm run bot-doc -- ${componentName} ${componentPath}`;

  const childProcess = exec(command);
  childProcess.stdout?.pipe(process.stdout); // Optional chaining to safely access stdout
  childProcess.stderr?.pipe(process.stderr); // Optional chaining to safely access stderr
  await new Promise<void>((resolve, reject) => {
    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
}

async function getChangedComponents(
  componentDirs: string[],
  gitComponents: string[]
): Promise<string[]> {
  // let changedComponents: string[] = [];

  const commonComponents = componentDirs.filter((componentDir) =>
    gitComponents.includes(componentDir)
  );

  // for (const componentDir of commonComponents) {
  //   const componentName = path.basename(componentDir);
  //   const storedHashPath = path.join(hashDir, `${componentName}.md5`);

  //   // if (
  //   //   checkComponentChange(`${componentDir}/${componentName}`, storedHashPath)
  //   // ) {
  //   changedComponents.push(componentDir);
  //   // }
  // }

  return commonComponents;
}

async function findAllComponentFolders(baseDir: string): Promise<string[]> {
  let componentDirs: string[] = [];
  const files = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      const dirPath = path.join(baseDir, file.name);
      const res = path.resolve(baseDir, file.name);
      const hasComponentFile = ['tsx', 'jsx', 'ts', 'js'].some((ext) =>
        fs.existsSync(path.join(res, `${file.name}.view.${ext}`))
      );

      if (hasComponentFile) {
        componentDirs.push(dirPath);
      }

      const nestedComponentDirs = await findAllComponentFolders(dirPath);
      componentDirs = componentDirs.concat(nestedComponentDirs);
    }
  }

  return componentDirs;
}

function adjustComponentPaths(componentDirs: string[]): string[] {
  return componentDirs.map((fullComponentPath) => {
    const pathParts = fullComponentPath.split(path.sep);

    // Check if the last segment repeats (e.g., 'Alert/Alert')
    if (
      pathParts.length > 1 &&
      pathParts[pathParts.length - 1] === pathParts[pathParts.length - 2]
    ) {
      pathParts.pop(); // Remove the last repeating segment
    }

    return pathParts.join(path.sep); // Join the parts back into a path
  });
}

async function ensureDocumentationForComponents(
  adjustedComponents: string[]
): Promise<void> {
  console.log('Checking for components without documentation...');

  const componentsWithoutMD = adjustedComponents.filter((componentDir) => {
    const componentName = path.basename(componentDir);

    const mdFilePath = `${componentDir}/${componentName}.md`;
    return !fs.existsSync(mdFilePath);
  });

  if (componentsWithoutMD.length > 0) {
    console.log(
      'Components missing documentation:',
      componentsWithoutMD.map((componentDir) => path.basename(componentDir)) // Fixed this line
    );

    for (const componentDir of componentsWithoutMD) {
      const componentName = path.basename(componentDir);
      console.log(`Creating documentation for ${componentName}...`);
      await createDocumentationForComponent(componentDir);
    }
  } else {
    console.log('All components have documentation.');
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
          const componentPath = parts.slice(0, -2).join(path.sep);
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
  const gitComponents = await getChangedComponentsSinceLastCommit();

  const componentDirs = await findAllComponentFolders(componentsDir);
  const adjustedComponents = adjustComponentPaths(componentDirs);

  if (!fs.existsSync(hashDir)) {
    fs.mkdirSync(hashDir);
  }

  const changedComponents = await getChangedComponents(
    adjustedComponents,
    gitComponents
  );

  console.log('Changed components: ' + changedComponents);
  if (changedComponents.length > 0) {
    console.log('Generating documentation for changed components:');
    for (const componentPath of changedComponents) {
      await createDocumentationForComponent(componentPath);
    }
  } else {
    console.log('No changes in components detected.');
  }

  await ensureDocumentationForComponents(adjustedComponents);
}

main();
