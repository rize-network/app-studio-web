# Documentation System

This guide explains the documentation system used in the App Studio Web Component Library.

## Overview

The documentation system consists of:

1. **Markdown Documentation**: General guides and tutorials in Markdown format
2. **MDX Component Documentation**: Interactive component documentation in MDX format
3. **Automated Documentation Generation**: Tools to generate and update documentation

## Documentation Structure

The documentation is organized into the following directories:

- `docs/`: General documentation and guides
- `public/files/media/`: MDX component documentation
- `src/data/props/`: Generated component props data

## MDX Component Documentation

Component documentation is written in MDX format, which allows for interactive examples. Each component has an MDX file in the `public/files/media/` directory.

Example MDX file structure:

```mdx
# Button

Customizable button for user interaction

### **Import**
  ```tsx
  import { Button } from '@app-studio/web';
  ```

### **Default**
```tsx
import React from 'react';
import { Button } from '../Button';

export const DefaultButton = () => (
  <Button onClick={() => alert('Hello, World!')}>Default</Button>
);
```

### **Props**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'filled' \| 'outline' \| 'ghost' \| 'link' | 'filled' | The visual style of the button |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | The size of the button |
```

## Documentation Generation

The documentation system includes tools to automatically generate and update documentation:

### bot-doc

The `bot-doc` tool generates component documentation by analyzing the component code. It:

1. Processes component files to add comments
2. Generates props data
3. Creates MDX documentation

To run `bot-doc` for a specific component:

```bash
npm run bot-doc -- ComponentName src/components/ComponentName
```

### create-docs

The `create-docs` script checks for components without documentation and generates documentation for them. It also updates documentation for components that have changed.

To run `create-docs`:

```bash
npm run create-docs
```

## Documentation Viewing

The documentation can be viewed in the application using the documentation viewer at `/docs`. The documentation viewer:

1. Loads MDX files
2. Renders them with the MDX provider
3. Provides a side menu for navigation

## Adding New Documentation

To add new documentation:

1. Create a new Markdown file in the appropriate directory
2. Add the file to the documentation structure
3. Link to the file from related documentation

## Updating Component Documentation

To update component documentation:

1. Run `bot-doc` for the component
2. Review the generated documentation
3. Make any necessary manual adjustments

## Documentation Maintenance Rules

### Rule 1: Single Source of Truth
- Each topic should have ONE authoritative documentation file
- Avoid duplicating content across multiple files
- Use cross-references instead of copying content
- **Prohibited**: Creating multiple files covering the same topic

### Rule 2: Clear File Responsibilities
- **README.md**: Project overview, quick start, navigation to specialized docs
- **README-ADK.md**: ADK-specific functionality ONLY
- **docs/README.md**: Documentation hub and navigation
- **docs/api-integration.md**: Backend integration patterns
- **Component docs**: Individual component usage and APIs

### Rule 3: Content Validation Checklist
Before adding/updating documentation:
- ✅ Check for existing content on the same topic
- ✅ Verify all code examples work
- ✅ Ensure links are valid and up-to-date
- ✅ Follow consistent markdown formatting
- ✅ Update related files if needed
- ✅ Remove outdated information

### Rule 4: Mandatory Updates
Documentation MUST be updated when:
- Adding new components or features
- Changing component APIs or props
- Modifying integration patterns
- Updating dependencies or requirements
- Changing project structure

### Rule 5: Quality Standards
- Use clear, concise language
- Include practical, working examples
- Follow consistent formatting and terminology
- Link related documentation appropriately
- Test all code examples before publishing
- Include accessibility information where relevant
- Document best practices and common pitfalls

## Documentation Best Practices

### Content Organization
- Keep documentation up-to-date with code changes
- Include examples for all components and features
- Use consistent formatting and terminology
- Link related documentation
- Test all code examples
- Include accessibility information
- Document best practices and common pitfalls

### File Naming Conventions
- Use kebab-case for file names: `component-development.md`
- Use descriptive names that clearly indicate content
- Avoid generic names like `guide.md` or `docs.md`

## Documentation Maintenance Workflow

### Before Making Changes
1. **Audit existing documentation**:
   ```bash
   # Check for duplicate content
   grep -r "your-search-term" docs/

   # Find broken links
   find docs/ -name "*.md" -exec grep -l "broken-link" {} \;
   ```

2. **Validate current structure**:
   - Ensure no topic is covered in multiple files
   - Check that all links work
   - Verify code examples are current

### After Making Changes
1. **Update related documentation**:
   - Update cross-references
   - Check for outdated information
   - Ensure consistency across files

2. **Run documentation tools**:
   ```bash
   npm run create-docs
   npm run bot-doc -- ComponentName src/components/ComponentName
   ```

### Regular Maintenance Tasks
- **Weekly**: Check for broken links and outdated examples
- **Monthly**: Review documentation structure for redundancies
- **Per Release**: Update all version-specific information

## Troubleshooting

If you encounter issues with the documentation system:

### Missing Component Documentation

If a component is missing documentation:

```bash
npm run bot-doc -- ComponentName src/components/ComponentName
```

### Documentation Not Updating

If documentation is not updating after code changes:

1. Check if the component has changed significantly
2. Run `bot-doc` manually for the component
3. Check for errors in the console

### MDX Rendering Issues

If MDX files are not rendering correctly:

1. Check the MDX syntax
2. Ensure the MDX file is in the correct location
3. Check for errors in the console

### Duplicate Content Issues

If you find duplicate content:

1. Identify the authoritative source
2. Remove duplicate content
3. Add cross-references to the authoritative source
4. Update any links pointing to removed content
