# App Studio Components Documentation

Welcome to the comprehensive documentation for `@app-studio/components` — a
cross-platform component library that ships a web build and a React Native
build with the same public API.

## Website guides

The documentation website starts at `/docs`. Guides live in `docs/guides`;
component references use the TypeScript API and compiled examples. The sidebar and component
browser are defined by `src/pages/docs/docs.config.ts` and the existing component
routes. `/docs/components` links references to their available example pages.

### Getting started

- [Introduction](./guides/overview.mdx)
- [Installation](./guides/installation.mdx)
- [Quick start](./guides/quick-start.mdx)
- [React Native setup](./guides/react-native.mdx)

### Foundations

- [App Studio foundations](./guides/core.mdx)
- [Styling and composition](./guides/styling.mdx)
- [Providers](./guides/providers.mdx)
- [Colors and theming](./guides/theming.mdx)
- [Responsive layouts](./guides/responsive.mdx)

### Implementation guides

- [Animation](./guides/animation.mdx)
- [Hooks](./guides/hooks.mdx)
- [Forms and validation](./guides/forms.mdx)
- [Accessibility](./guides/accessibility.mdx)
- [Troubleshooting](./guides/troubleshooting.mdx)

Each component reference includes its import, interactive examples with complete
copyable code, searchable props, required markers, implementation defaults, and
compound component APIs. Shared style props link to the foundations guides.

The **Playground** mode edits one component instance in a real example. It offers
boolean, enum, text, number, and common styling controls, plus JSON object editors
for style objects. Preview and copied code share the same prop overrides; state
and callbacks remain in the original example. Invalid values keep the last valid
preview and code. Reset restores the original props.

### Maintaining component references

Run `npm run docs:api` after changing public props or examples. This generates
`src/pages/docs/component-api.json` and the lightweight reference-name list from
the current TypeScript declarations. The website start and production build run
it automatically. `npm run docs:api:check` checks that the committed data matches
the source.

Focused documentation examples live in `src/pages/docs/examples`. Other examples
are reused from each component's `examples` folder. Previews execute the compiled
source; copyable code uses published imports. Modules that are not package
exports are explicitly identified as repository modules.

An optional `Component.playground.tsx` provides a focused playground seed when the
regular example demonstrates a container or an imperative API. The generator
extracts editable controls and source ranges from TypeScript; it never evaluates
user-supplied expressions. Runtime imports are limited to the packages already
used by these documentation examples.

The generator includes the public props, callable compound parts, and a selection
of common inherited styling props. It does not infer dynamic defaults. The
original MDX files in `docs/components` remain available as source material and
for older supplemental URLs; they no longer supply the main component pages.

## Maintainer and platform references

### Core Documentation

- **[Getting Started](./getting-started/introduction.md)** — Quick introduction and setup (web + RN)
- **[React Native Guide](./getting-started/react-native.md)** — RN peer deps, compatibility matrix, Form/Grid contracts, Reanimated, Metro/tsc resolution
- **[Component Development](./component-development/guide.md)** — Building and contributing components (including `.native.tsx` siblings)
- **[API Integration](./api-integration.md)** — Backend integration patterns
- **[Design System](./design-system/theming.md)** — Theming and styling guidelines
- **[Generating a Design-System Config](./design-system/design-system.md)** — Step-by-step recipe (for agents) to author a new brand config that works in light + dark

### Specialized Documentation

- **[ADK Components](../README-ADK.md)** — Agent Development Kit integration
- **[Components Reference](./components.md)** — Summary of all component APIs
- **[Detailed Components](./components/)** — Per-component pages
- **[Tutorials](./tutorials/README.md)** — Step-by-step guides
- **[Contributing](./contributing/documentation.md)** — Contribution guidelines

### Related packages

- **[`app-studio`](../../app-studio/docs/README.md)** — The styling/theme/animation primitive this library is built on (its `Animation.md` and `Native.md` cover the cross-platform fundamentals)
- **[`app-studio-rn-demo`](../../app-studio-rn-demo/README.md)** — Working RN sandbox app that consumes `@app-studio/components`

## 🚀 Quick Navigation

### For New Users

Start with [Installation](./guides/installation.mdx), then follow the
[Quick start](./guides/quick-start.mdx).

### For Developers

Refer to the [Component Development Guide](./component-development/guide.md) for building and customizing components.

### For ADK Integration

Check the [ADK Components documentation](../README-ADK.md) for agent-specific functionality.

## Documentation Tools

The website's component reference is generated locally without an API key:

```bash
npm run docs:api
npm run docs:api:check
```

The older MDX generation tools are retained for source material:

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
