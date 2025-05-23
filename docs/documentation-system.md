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

## Documentation Best Practices

- Keep documentation up-to-date with code changes
- Include examples for all components and features
- Use consistent formatting and terminology
- Link related documentation
- Test all code examples
- Include accessibility information
- Document best practices and common pitfalls

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
