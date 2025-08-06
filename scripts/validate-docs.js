#!/usr/bin/env node

/**
 * Documentation Validation Script
 * 
 * This script validates the documentation structure and content
 * to ensure it follows the established maintenance rules.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const DOCS_DIR = path.join(__dirname, '../docs');
const ROOT_DIR = path.join(__dirname, '..');

// Validation rules
const VALIDATION_RULES = {
  // Files that should exist
  REQUIRED_FILES: [
    'README.md',
    'README-ADK.md',
    'docs/README.md',
    'docs/api-integration.md',
    'docs/documentation-system.md'
  ],
  
  // Files that should NOT exist (removed duplicates)
  PROHIBITED_FILES: [
    'docs/guide.md',
    'docs/integration-guide.md'
  ],
  
  // Content that should not be duplicated
  DUPLICATE_CONTENT_CHECKS: [
    'npm install @app-studio/web',
    'Quick Start',
    'Installation'
  ]
};

class DocumentationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  // Check if required files exist
  validateRequiredFiles() {
    console.log('🔍 Checking required files...');
    
    VALIDATION_RULES.REQUIRED_FILES.forEach(file => {
      const filePath = path.join(ROOT_DIR, file);
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing required file: ${file}`);
      } else {
        console.log(`✅ Found: ${file}`);
      }
    });
  }

  // Check if prohibited files exist
  validateProhibitedFiles() {
    console.log('\n🚫 Checking for prohibited files...');
    
    VALIDATION_RULES.PROHIBITED_FILES.forEach(file => {
      const filePath = path.join(ROOT_DIR, file);
      if (fs.existsSync(filePath)) {
        this.errors.push(`Prohibited file exists: ${file} (should be removed)`);
      } else {
        console.log(`✅ Correctly removed: ${file}`);
      }
    });
  }

  // Check for duplicate content across files
  validateDuplicateContent() {
    console.log('\n🔄 Checking for duplicate content...');
    
    const markdownFiles = glob.sync('**/*.md', { 
      cwd: ROOT_DIR,
      ignore: ['node_modules/**', 'cache/**']
    });

    const contentMap = new Map();
    
    markdownFiles.forEach(file => {
      const filePath = path.join(ROOT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      VALIDATION_RULES.DUPLICATE_CONTENT_CHECKS.forEach(searchTerm => {
        if (content.includes(searchTerm)) {
          if (!contentMap.has(searchTerm)) {
            contentMap.set(searchTerm, []);
          }
          contentMap.get(searchTerm).push(file);
        }
      });
    });

    // Report duplicates
    contentMap.forEach((files, content) => {
      if (files.length > 1) {
        this.warnings.push(`Duplicate content "${content}" found in: ${files.join(', ')}`);
      }
    });
  }

  // Check for broken internal links
  validateInternalLinks() {
    console.log('\n🔗 Checking internal links...');
    
    const markdownFiles = glob.sync('**/*.md', { 
      cwd: ROOT_DIR,
      ignore: ['node_modules/**', 'cache/**']
    });

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    markdownFiles.forEach(file => {
      const filePath = path.join(ROOT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const fileDir = path.dirname(filePath);
      
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const linkPath = match[2];
        
        // Skip external links
        if (linkPath.startsWith('http') || linkPath.startsWith('mailto:')) {
          continue;
        }
        
        // Check if internal link exists
        const targetPath = path.resolve(fileDir, linkPath);
        if (!fs.existsSync(targetPath)) {
          this.errors.push(`Broken link in ${file}: ${linkPath}`);
        }
      }
    });
  }

  // Run all validations
  validate() {
    console.log('📋 Starting documentation validation...\n');
    
    this.validateRequiredFiles();
    this.validateProhibitedFiles();
    this.validateDuplicateContent();
    this.validateInternalLinks();
    
    // Report results
    console.log('\n📊 Validation Results:');
    console.log('='.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All validations passed!');
      return true;
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      this.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    return this.errors.length === 0;
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new DocumentationValidator();
  const success = validator.validate();
  process.exit(success ? 0 : 1);
}

module.exports = DocumentationValidator;
