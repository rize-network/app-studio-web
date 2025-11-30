#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/components');

// Get all .mdx files
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.mdx'));

console.log(`Found ${files.length} MDX files to process\n`);

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Pattern 1: import { Component } from '../Component';
  // Replace with: import { Component } from '@app-studio/web';
  const pattern1 = /import\s+{([^}]+)}\s+from\s+['"]\.\.\/([^'"]+)['"]/g;
  content = content.replace(pattern1, (match, imports, componentPath) => {
    // Extract the component name from the path (e.g., 'Button' from 'Button' or 'Button/Button')
    const componentName = componentPath.split('/')[0];
    return `import { ${imports.trim()} } from '@app-studio/web'`;
  });
  
  // Pattern 2: import { Component } from '../../Component/Component';
  // Replace with: import { Component } from '@app-studio/web';
  const pattern2 = /import\s+{([^}]+)}\s+from\s+['"]\.\.\/\.\.\/([^'"]+)['"]/g;
  content = content.replace(pattern2, (match, imports, componentPath) => {
    return `import { ${imports.trim()} } from '@app-studio/web'`;
  });
  
  // Pattern 3: Consolidate multiple imports from '@app-studio/web' on separate lines
  // This is a more complex pattern that we'll handle separately if needed
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`✓ Fixed: ${file}`);
  } else {
    console.log(`  Skipped: ${file} (no changes needed)`);
  }
});

console.log(`\n✨ Done! Fixed ${totalChanges} out of ${files.length} files.`);
