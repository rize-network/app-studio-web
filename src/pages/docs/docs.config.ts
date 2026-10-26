import { componentList } from 'src/configs/componentList';
import referenceNames from './component-reference-names.json';

export const guidePages = [
  {
    slug: 'overview',
    title: 'Introduction',
    section: 'Getting started',
    description: 'Understand the two packages and choose your starting point.',
  },
  {
    slug: 'installation',
    title: 'Installation',
    section: 'Getting started',
    description:
      'Install the packages, check peer dependencies, and configure your app.',
    alias: 'GettingStarted',
  },
  {
    slug: 'quick-start',
    title: 'Quick start',
    section: 'Getting started',
    description:
      'Build a working interface with providers and controlled components.',
  },
  {
    slug: 'react-native',
    title: 'React Native',
    section: 'Getting started',
    description: 'Set up native builds and understand platform differences.',
  },
  {
    slug: 'core',
    title: 'App Studio foundations',
    section: 'Foundations',
    description:
      'Learn layout primitives, style props, and how the packages fit together.',
    alias: 'AppStudio',
  },
  {
    slug: 'styling',
    title: 'Styling & composition',
    section: 'Foundations',
    description:
      'Style components, choose variants, and customize internal views.',
  },
  {
    slug: 'providers',
    title: 'Providers',
    section: 'Foundations',
    description:
      'Configure shared theme and responsive contexts, with optional providers when needed.',
  },
  {
    slug: 'theming',
    title: 'Colors & theming',
    section: 'Foundations',
    description:
      'Connect your brand, semantic tokens, and light and dark palettes.',
  },
  {
    slug: 'responsive',
    title: 'Responsive layouts',
    section: 'Foundations',
    description: 'Adapt your layout with media props and responsive providers.',
  },
  {
    slug: 'animation',
    title: 'Animation',
    section: 'Guides',
    description: 'Add motion and respect reduced-motion preferences.',
  },
  {
    slug: 'hooks',
    title: 'Hooks',
    section: 'Guides',
    description:
      'Read theme, responsive, hover, and window state from React components.',
  },
  {
    slug: 'forms',
    title: 'Forms & validation',
    section: 'Guides',
    description:
      'Control field values and connect Formik with explicit validation.',
  },
  {
    slug: 'accessibility',
    title: 'Accessibility',
    section: 'Guides',
    description:
      'Build labeled, keyboard-friendly interfaces and test real interactions.',
  },
  {
    slug: 'ai-assistants',
    title: 'AI & coding assistants',
    section: 'Guides',
    description:
      'Use the Markdown documentation, API references, and source examples with your coding assistant.',
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    section: 'Guides',
    description:
      'Resolve missing colors, peer dependency errors, and platform issues.',
  },
];

export const componentCategories = [
  'Inputs',
  'Layout',
  'Navigation',
  'Data Display',
  'Feedback',
  'Utility',
  'Experimental',
];
export const normalizeDocName = (value: string) =>
  value.replace(/[^a-z0-9]/gi, '').toLowerCase();
export function findGuide(name = 'overview') {
  return guidePages.find(
    (guide) =>
      normalizeDocName(guide.slug) === normalizeDocName(name || 'overview') ||
      Boolean(
        guide.alias && normalizeDocName(guide.alias) === normalizeDocName(name)
      )
  );
}

const componentDocFiles = Object.keys(
  import.meta.glob('/docs/components/*.{md,mdx}', {
    query: '?raw',
    import: 'default',
  })
);
const fileName = (file: string) =>
  file
    .split('/')
    .pop()!
    .replace(/\.[^.]+$/, '');
const referenceAliases: Record<string, string> = {
  Chat: 'ChatInput',
  Upload: 'Uploader',
};
export function componentReference(name: string) {
  const reference = referenceNames.find(
    (item) =>
      normalizeDocName(item) ===
      normalizeDocName(referenceAliases[name] || name)
  );
  if (reference) return '/docs/' + reference;
  const match = componentDocFiles.find(
    (file) =>
      normalizeDocName(fileName(file)) ===
      normalizeDocName(referenceAliases[name] || name)
  );
  return match ? '/docs/' + fileName(match) : undefined;
}

interface DocumentationComponent {
  name: string;
  path: string;
  category: string;
  examplePath?: string;
}
const exampleComponents: DocumentationComponent[] = componentList
  .filter((item) => item.category !== 'Hidden')
  .map(({ name, path, category }) => ({
    name,
    path,
    category,
    examplePath: path,
  }));
const extraComponents: DocumentationComponent[] = componentDocFiles
  .map(fileName)
  .filter(
    (name) =>
      !name.includes('-') &&
      !exampleComponents.some(
        (item) => componentReference(item.name) === '/docs/' + name
      )
  )
  .map((name) => ({
    name,
    path: '/docs/' + name,
    category: ['Center', 'Horizontal', 'Vertical'].includes(name)
      ? 'Layout'
      : ['ColorInput', 'Label', 'File', 'Form'].includes(name)
      ? 'Inputs'
      : name === 'Text'
      ? 'Data Display'
      : 'Utility',
  }));
export const documentationComponents = [
  ...exampleComponents,
  ...extraComponents,
].sort((a, b) => a.name.localeCompare(b.name));
