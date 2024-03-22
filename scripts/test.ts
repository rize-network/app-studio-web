import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

function generateMD5ForComponent(componentPath: string): string {
  let hash = crypto.createHash('md5');
  let files = fs.readdirSync(componentPath).sort();

  files.forEach((file) => {
    let filePath = path.join(componentPath, file);
    if (fs.statSync(filePath).isFile()) {
      let fileContent = fs.readFileSync(filePath);
      hash.update(fileContent);
    }
  });

  let digest = hash.digest('hex');
  console.log(`Generated hash for ${componentPath}: ${digest}`);
  return digest;
}

function checkComponentChange(
  componentPath: string,
  storedHashPath: string
): boolean {
  let currentHash = generateMD5ForComponent(componentPath);
  let storedHash = fs.existsSync(storedHashPath)
    ? fs.readFileSync(storedHashPath, 'utf8')
    : null;

  console.log(`Current hash: ${currentHash}`);
  console.log(`Stored hash: ${storedHash || 'none'}`);

  if (!storedHash || currentHash !== storedHash) {
    fs.writeFileSync(storedHashPath, currentHash);
    return true;
  }

  return false;
}

// Example usage
const componentPath = 'src/components/Alert/Alert';
const storedHashPath = 'src/components/Alert/hash.txt';

if (checkComponentChange(componentPath, storedHashPath)) {
  console.log('Component has changed or is new.');
} else {
  console.log('No changes detected in the component.');
}
