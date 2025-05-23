# App Studio Web Component Library Documentation

Welcome to the documentation for the App Studio Web Component Library. This documentation provides comprehensive guides, API references, and examples to help you build high-quality components and applications using our library.

## Documentation Structure

- **Getting Started**: Quick start guides to help you begin using the library
- **Component Development**: Detailed guides for building components
- **Design System**: Information about the design system, theming, and styling
- **API Reference**: Detailed API documentation for all components
- **Tutorials**: Step-by-step tutorials for common tasks
- **Contributing**: Guidelines for contributing to the library

## Using This Documentation

The documentation is organized to support different learning styles and needs:

- If you're new to the library, start with the [Getting Started](./getting-started/introduction.md) guide
- If you're building components, refer to the [Component Development Guide](./component-development/guide.md)
- If you need detailed API information, check the [API Reference](./api-reference/README.md)
- If you want to learn through examples, explore the [Tutorials](./tutorials/README.md)

## Documentation Tools

This library uses several tools to generate and maintain documentation:

- **MDX**: Component documentation is written in MDX format, allowing for interactive examples
- **bot-doc**: Automated documentation generation tool that creates component documentation
- **create-docs**: Script to generate or update documentation for components

To regenerate documentation for all components, run:

```bash
npm run create-docs
```

To generate documentation for a specific component:

```bash
npm run bot-doc -- ComponentName src/components/ComponentName
```

## Contributing to Documentation

We welcome contributions to improve our documentation. If you find any issues or have suggestions for improvement, please:

1. Check the existing documentation to avoid duplication
2. Follow the same formatting and structure as existing documentation
3. Include examples where appropriate
4. Submit a pull request with your changes

For more detailed guidelines, see the [Contributing Guide](./contributing/documentation.md).
