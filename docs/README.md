# App Studio Web Component Library Documentation

Welcome to the comprehensive documentation for the App Studio Web Component Library. This documentation provides guides, API references, and examples to help you build high-quality components and applications.

## 📖 Documentation Structure

### Core Documentation
- **[Getting Started](./getting-started/introduction.md)** - Quick introduction and setup
- **[Component Development](./component-development/guide.md)** - Building and contributing components
- **[API Integration](./api-integration.md)** - Backend integration patterns
- **[Design System](./design-system/theming.md)** - Theming and styling guidelines

### Specialized Documentation
- **[ADK Components](../README-ADK.md)** - Agent Development Kit integration
- **[Compoments Reference](./components.md)** - Summary of all component APIs
- **[Detailed Copoments](./components/)** - Detailed component APIs
- **[Tutorials](./tutorials/README.md)** - Step-by-step guides
- **[Contributing](./contributing/documentation.md)** - Contribution guidelines

## 🚀 Quick Navigation

### For New Users
Start with the [Getting Started Guide](./getting-started/introduction.md) to understand the library basics and setup process.

### For Developers
Refer to the [Component Development Guide](./component-development/guide.md) for building and customizing components.

### For ADK Integration
Check the [ADK Components documentation](../README-ADK.md) for agent-specific functionality.

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
