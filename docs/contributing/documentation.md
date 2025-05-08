# Contributing to Documentation

This guide explains how to contribute to the documentation for the App Studio Web Component Library.

## Documentation Structure

The documentation is organized into the following sections:

- **Getting Started**: Quick start guides for new users
- **Component Development**: Guides for building components
- **Design System**: Information about theming and styling
- **API Reference**: Detailed API documentation for all components
- **Tutorials**: Step-by-step tutorials for common tasks
- **Contributing**: Guidelines for contributing to the library

## Documentation Tools

The documentation uses the following tools:

- **Markdown**: Most documentation is written in Markdown format
- **MDX**: Component documentation uses MDX for interactive examples
- **bot-doc**: Automated documentation generation tool

## Writing Documentation

When writing documentation, follow these guidelines:

### General Guidelines

- Use clear, concise language
- Use proper grammar and spelling
- Use consistent terminology
- Use headings to organize content
- Include examples where appropriate
- Link to related documentation

### Markdown Formatting

- Use `#` for top-level headings, `##` for second-level headings, etc.
- Use backticks for inline code: `` `code` ``
- Use triple backticks for code blocks:
  ```
  ```jsx
  // Code here
  ```
  ```
- Use `*` or `_` for emphasis: *italic* or _italic_
- Use `**` or `__` for strong emphasis: **bold** or __bold__
- Use `>` for blockquotes
- Use `- ` for unordered lists
- Use `1. ` for ordered lists
- Use `[text](url)` for links
- Use `![alt text](image-url)` for images

### Component Documentation

Component documentation should include:

1. **Import** - How to import the component
2. **Props** - Detailed list of props with types and descriptions
3. **Examples** - Basic usage examples
4. **Variants** - Available variants and their usage
5. **Compound Components** - Sub-components (if applicable)
6. **Accessibility** - Accessibility features and considerations
7. **Best Practices** - Recommended usage patterns

Example:

```mdx
# Button

The Button component is used to trigger an action or event.

## Import

```jsx
import { Button } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'filled' \| 'outline' \| 'ghost' \| 'link' | 'filled' | The visual style of the button |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | The size of the button |
| isDisabled | boolean | false | Whether the button is disabled |
| isLoading | boolean | false | Whether the button is in a loading state |

## Examples

### Basic Button

```jsx
<Button onClick={() => alert('Button clicked!')}>Click Me</Button>
```

### Button Variants

```jsx
<>
  <Button variant="filled">Filled</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</>
```
```

## Generating Component Documentation

Component documentation is automatically generated using the `bot-doc` tool. To generate documentation for a component:

```bash
npm run bot-doc -- ComponentName src/components/ComponentName
```

To regenerate documentation for all components:

```bash
npm run create-docs
```

## Documentation Review Process

Before submitting documentation changes, review your changes for:

1. **Accuracy**: Ensure the information is correct
2. **Completeness**: Ensure all relevant information is included
3. **Clarity**: Ensure the information is easy to understand
4. **Consistency**: Ensure the style and terminology are consistent
5. **Examples**: Ensure examples are clear and work as expected

## Submitting Documentation Changes

To submit documentation changes:

1. Create a branch for your changes
2. Make your changes
3. Test your changes locally
4. Commit your changes with a clear commit message
5. Push your changes to your branch
6. Create a pull request

## Documentation Best Practices

- **Be concise**: Use clear, direct language
- **Use examples**: Include code examples for complex concepts
- **Be consistent**: Use consistent terminology and formatting
- **Link related content**: Add links to related documentation
- **Update related docs**: When changing one document, update related documents
- **Test code examples**: Ensure all code examples work as expected
- **Use proper grammar**: Check spelling and grammar
- **Use proper formatting**: Use consistent Markdown formatting
