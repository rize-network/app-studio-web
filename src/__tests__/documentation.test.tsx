import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, ResponsiveProvider } from 'app-studio';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { loadDocs } from 'src/docsLoader';
import DocumentationLayout from 'src/pages/docs/DocumentationLayout';
import DocsPage from 'src/pages/docs/docs.page';
import ComponentCatalog from 'src/pages/docs/ComponentCatalog';
import ButtonPage from 'src/pages/button.page';
import {
  componentReference,
  documentationComponents,
  findGuide,
  guidePages,
} from 'src/pages/docs/docs.config';
import { prepareExample } from 'src/pages/docs/components/DocumentationCode';
import CustomLiveCode from 'src/pages/docs/components/CustomLiveCode.component';
import componentApi from 'src/pages/docs/component-api.json';
import { findComponentDefinition } from 'src/pages/docs/ComponentReference';
import { existsSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { load } from 'cheerio';
import {
  parseControlValue,
  playgroundCopyCode,
  playgroundPreviewCode,
} from 'src/pages/docs/components/playground.utils';

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test('example code is in the initial HTML and stays behind the existing Code tab', () => {
  const code =
    "import { Button } from '@app-studio/components';\n<Button>Save</Button>";
  const $ = load(
    renderToString(
      <CustomLiveCode code={code} originalCode={code} scope={{}} />
    )
  );
  expect($('pre.docs-example-code').text()).toBe(code);
  expect($('pre.docs-example-code').attr('hidden')).toBeDefined();
});

function show(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider>
          <ResponsiveProvider>
            <Routes>
              <Route element={<DocumentationLayout />}>
                <Route path="/docs/components" element={<ComponentCatalog />} />
                <Route path="/docs/:componentName?" element={<DocsPage />} />
                <Route path="/button" element={<ButtonPage />} />
              </Route>
            </Routes>
          </ResponsiveProvider>
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

test('all guides exist, compile, and retain the landing page setup links', async () => {
  const docs = await loadDocs();
  expect(findGuide('GettingStarted')?.slug).toBe('installation');
  expect(findGuide('AppStudio')?.slug).toBe('core');
  expect(findGuide('unknown')).toBeUndefined();
  expect(componentReference('Button')).toBe('/docs/Button');
  expect(componentReference('Textfield')).toBe('/docs/TextField');
  expect(componentReference('UnknownControl')).toBeUndefined();
  expect(
    documentationComponents.every((item) => item.category !== 'Hidden')
  ).toBe(true);
  for (const guide of guidePages) {
    const doc = docs.find(
      (item) => item.componentName === (guide.alias || guide.slug)
    );
    expect(doc?.content, guide.slug).toBeTruthy();
    const result = await evaluate(doc!.content as string, { ...runtime });
    expect(result.default).toBeTypeOf('function');
    for (const match of (doc!.content as string).matchAll(
      /\]\((\/docs[^)#]*)/g
    )) {
      const target = match[1].split('/')[2]?.replace(/\.md$/, '');
      expect(
        target === 'components' ||
          !target ||
          findGuide(target) ||
          componentReference(target),
        match[1]
      ).toBeTruthy();
    }
  }
});

test('AI documentation fetches Markdown files through a normal document navigation', async () => {
  show('/docs/ai-assistants');
  await screen.findByRole('heading', {
    name: 'App Studio with AI & coding assistants',
  });
  const markdown = screen.getByRole('link', { name: 'Button.md' });
  let intercepted: boolean | undefined;
  document.addEventListener(
    'click',
    (event) => {
      intercepted = event.defaultPrevented;
      event.preventDefault();
    },
    { once: true }
  );
  fireEvent.click(markdown);
  expect(intercepted).toBe(false);
});

test('introduction has one navigation, a contents list, and the next installation step', async () => {
  show('/docs');
  expect(
    await screen.findByRole('heading', { name: 'Build with App Studio' })
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('complementary', { name: 'Documentation navigation' })
  ).toHaveLength(1);
  expect(
    screen.getByRole('navigation', { name: 'Documentation pages' })
  ).toHaveTextContent('Installation');
  await waitFor(() =>
    expect(
      screen.getByRole('complementary', { name: 'On this page' })
    ).toHaveTextContent('Two packages, one foundation')
  );
  expect(
    screen.getByRole('heading', { name: 'Two packages, one foundation' })
  ).toHaveAttribute('id', 'two-packages-one-foundation');
});

test('sidebar search filters components and recovers from an empty result', async () => {
  show('/docs');
  await screen.findByRole('heading', { name: 'Build with App Studio' });
  const search = screen.getByRole('textbox', { name: 'Search documentation' });
  fireEvent.change(search, { target: { value: 'button' } });
  const navigation = screen.getByRole('navigation', {
    name: 'Guides and components',
  });
  expect(
    within(navigation).getByRole('link', { name: 'Button' })
  ).toHaveAttribute('href', '/docs/Button');
  expect(
    within(navigation).queryByRole('link', { name: 'Checkbox' })
  ).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'does-not-exist' } });
  expect(screen.getByRole('status')).toHaveTextContent('No results');
  fireEvent.change(search, { target: { value: '' } });
  expect(
    within(navigation).getByRole('link', { name: 'Installation' })
  ).toBeInTheDocument();
});

test('the sidebar switches between guides and components without mixing both lists', async () => {
  show('/docs');
  await screen.findByRole('heading', { name: 'Build with App Studio' });
  const sections = screen.getByLabelText('Documentation sections');
  const navigation = screen.getByRole('navigation', {
    name: 'Guides and components',
  });
  expect(
    within(navigation).getByRole('link', { name: 'Installation' })
  ).toBeInTheDocument();
  expect(
    within(navigation).queryByRole('link', { name: /All components/ })
  ).not.toBeInTheDocument();
  fireEvent.click(within(sections).getByRole('link', { name: 'Components' }));
  expect(
    within(sections).getByRole('link', { name: 'Components' })
  ).toHaveAttribute('aria-current', 'true');
  expect(
    within(navigation).getByRole('link', { name: /All components/ })
  ).toBeInTheDocument();
  expect(
    within(navigation).queryByRole('link', { name: 'Installation' })
  ).not.toBeInTheDocument();
  fireEvent.click(within(sections).getByRole('link', { name: 'Guides' }));
  expect(
    await within(navigation).findByRole('link', { name: 'Installation' })
  ).toBeInTheDocument();
});

test('component browser filters by name and category and opens the existing examples', async () => {
  show('/docs/components');
  const filter = screen.getByRole('textbox', { name: 'Filter components' });
  fireEvent.change(filter, { target: { value: 'button' } });
  expect(
    screen.getByRole('status', { name: 'Component results' })
  ).toHaveTextContent('2 components');
  fireEvent.click(screen.getByRole('button', { name: 'Navigation' }));
  expect(
    screen.getByRole('heading', { name: 'No matching components' })
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
  fireEvent.change(filter, { target: { value: 'button' } });
  const card = screen
    .getByRole('heading', { name: 'Button' })
    .closest('article')!;
  expect(within(card).getByRole('link', { name: 'Reference' })).toHaveAttribute(
    'href',
    '/docs/Button'
  );
  fireEvent.click(within(card).getByRole('link', { name: 'View examples' }));
  expect(
    await screen.findByRole('heading', { level: 1, name: 'Button' })
  ).toBeInTheDocument();
  expect(screen.getByText('Colors & Branding')).toBeInTheDocument();
});

test('mobile documentation navigation focuses the menu and closes with Escape or an outside touch', async () => {
  show('/docs');
  await screen.findByRole('heading', { name: 'Build with App Studio' });
  fireEvent.click(
    screen.getByRole('button', { name: 'Open documentation navigation' })
  );
  expect(
    screen.getByRole('button', { name: 'Close documentation navigation' })
  ).toHaveAttribute('aria-expanded', 'true');
  expect(
    screen.getByRole('complementary', { name: 'Documentation navigation' })
  ).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(
    screen.getByRole('button', { name: 'Open documentation navigation' })
  ).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(
    screen.getByRole('button', { name: 'Open documentation navigation' })
  );
  fireEvent.pointerDown(screen.getByRole('main'));
  expect(
    screen.getByRole('button', { name: 'Open documentation navigation' })
  ).toHaveAttribute('aria-expanded', 'false');
});

test('unknown documentation keeps navigation and useful recovery links', async () => {
  show('/docs/not-a-real-page');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    "We couldn't open this page."
  );
  expect(
    screen.getByRole('link', { name: 'Browse components' })
  ).toHaveAttribute('href', '/docs/components');
});

test('every catalog component has current props and portable, compiled examples', () => {
  for (const component of documentationComponents) {
    const definition = findComponentDefinition(component.name);
    expect(definition, component.name).toBeTruthy();
    expect(componentReference(component.name), component.name).toMatch(
      /^\/docs\//
    );
    expect(definition!.groups[0].props.length, component.name).toBeGreaterThan(
      0
    );
    expect(definition!.examples.length, component.name).toBeGreaterThan(0);
    for (const example of definition!.examples) {
      expect(existsSync(process.cwd() + example.file), example.file).toBe(true);
      if (definition!.packageName)
        expect(example.code, example.file).not.toMatch(
          /from ['"](?:src\/|\.\.?\/)/
        );
    }
  }
  expect(
    componentApi.Button.groups[0].props.find((prop) => prop.name === 'shape')
      ?.values
  ).toEqual(['"square"', '"rounded"', '"pill"']);
  expect(
    componentApi.Button.groups[0].props.some(
      (prop) => prop.name === 'explicitTextColor'
    )
  ).toBe(false);
  expect(componentApi.Tabs.groups.map((group) => group.name)).toContain(
    'Tabs.Trigger'
  );
  expect(componentApi.Table.groups.map((group) => group.name)).toContain(
    'Table.Template'
  );
});

test.each(Object.keys(componentApi))(
  '%s mounts its primary documentation example',
  async (name) => {
    show(`/docs/${name}`);
    await screen.findByRole(
      'heading',
      { name: 'Interactive examples' },
      { timeout: 15000 }
    );
    await waitFor(
      () =>
        expect(
          screen.queryByText('Loading example…', {
            selector: '.docs-example-preview [role="status"]',
          })
        ).not.toBeInTheDocument(),
      { timeout: 15000 }
    );
    expect(
      screen.queryByText('This example needs an update.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('This example could not be rendered.')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Playground' }));
    await screen.findByRole(
      'region',
      { name: 'Component playground' },
      { timeout: 15000 }
    );
    await waitFor(
      () =>
        expect(
          screen.queryByText('Loading preview…', {
            selector: '.docs-example-preview [role="status"]',
          })
        ).not.toBeInTheDocument(),
      { timeout: 15000 }
    );
    expect(
      screen.queryByText('This example needs an update.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('This example could not be rendered.')
    ).not.toBeInTheDocument();
  },
  20000
);

test('component reference runs real examples, exposes defaults, and filters props', async () => {
  show('/docs/Button');
  const action = await screen.findByRole(
    'button',
    { name: 'Run action' },
    { timeout: 15000 }
  );
  fireEvent.click(action);
  expect(screen.getByText('1 actions completed')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'States' }));
  const save = await screen.findByRole('button', { name: 'Save changes' });
  fireEvent.click(screen.getByRole('button', { name: 'Show loading' }));
  expect(save).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Code' }));
  expect(document.querySelector('pre.docs-example-code')).toHaveTextContent(
    "from '@app-studio/components'"
  );
  fireEvent.change(screen.getByRole('textbox', { name: 'Filter props' }), {
    target: { value: 'shape' },
  });
  const table = screen.getByRole('table', { name: 'Button' });
  expect(table).toHaveTextContent('rounded');
  expect(table).toHaveTextContent('pill');
  expect(
    within(table).queryByRole('rowheader', { name: 'isLoading' })
  ).not.toBeInTheDocument();
}, 20000);

test('a field reference supports value changes and marks required compound props', async () => {
  show('/docs/TextField');
  const field = await screen.findByRole(
    'textbox',
    { name: 'Project name' },
    { timeout: 15000 }
  );
  fireEvent.change(field, { target: { value: 'A new project' } });
  expect(screen.getByText('Project: A new project')).toBeInTheDocument();
  cleanup();
  show('/docs/Tabs');
  const trigger = await screen.findByRole('table', {
    name: 'Tabs.Trigger',
  });
  const value = within(trigger).getByRole('rowheader', {
    name: /value\s*Required/,
  });
  expect(value).toBeInTheDocument();
}, 20000);

test('the toast example includes its container and dismisses its visible notification', async () => {
  show('/docs/Toast');
  fireEvent.click(
    await screen.findByRole(
      'button',
      { name: 'Show success' },
      { timeout: 15000 }
    )
  );
  expect(await screen.findByText('Project saved')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Dismiss all' }));
  await waitFor(() =>
    expect(screen.queryByText('Project saved')).not.toBeInTheDocument()
  );
}, 20000);

test('playground code preserves imports and callbacks and serializes prop values safely', async () => {
  const { transform } = await import('@babel/standalone');
  for (const [name, definition] of Object.entries(componentApi)) {
    const playground = findComponentDefinition(name)!.playground;
    expect(playground.controls.length, name).toBeGreaterThan(0);
    const control = playground.controls[0];
    const value =
      control.kind === 'boolean'
        ? true
        : control.kind === 'number'
        ? 23
        : control.kind === 'json'
        ? {}
        : control.kind === 'enum'
        ? control.options![0]
        : 'A "quoted" <label>';
    const code = playgroundCopyCode(playground, { [control.name]: value });
    expect(code, name).not.toContain('__PlaygroundTarget');
    expect(
      () =>
        transform(code, {
          filename: 'example.tsx',
          presets: [
            'react',
            ['typescript', { allExtensions: true, isTSX: true }],
          ],
          plugins: ['transform-modules-commonjs'],
        }),
      name
    ).not.toThrow();
    expect(playgroundPreviewCode(playground), name).toContain(
      '__PlaygroundTarget'
    );
    expect(playgroundCopyCode(playground, {}), name).toBe(
      playground.example.code
    );
  }
  expect(() =>
    parseControlValue(
      { name: 'size', kind: 'enum', options: ['sm', 'lg'] },
      '"unknown"'
    )
  ).toThrow();
  expect(() =>
    parseControlValue({ name: 'gap', kind: 'number' }, 'Infinity')
  ).toThrow();
  expect(() =>
    parseControlValue({ name: 'views', kind: 'json' }, '{broken')
  ).toThrow();
  expect(() =>
    parseControlValue({ name: 'views', kind: 'json' }, '[]')
  ).toThrow();
  expect(() =>
    parseControlValue(
      { name: 'views', kind: 'json' },
      '{"container":{"__proto__":{"value":true}}}'
    )
  ).toThrow();
  expect(parseControlValue({ name: 'gap', kind: 'number' }, '24')).toBe(24);
});

test('playground edits update the preview and copied code while preserving state, then reset', async () => {
  const originalClipboard = Object.getOwnPropertyDescriptor(
    navigator,
    'clipboard'
  );
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
  try {
    show('/docs/Button');
    fireEvent.click(await screen.findByRole('button', { name: 'Playground' }));
    const region = await screen.findByRole(
      'region',
      {
        name: 'Component playground',
      },
      { timeout: 15000 }
    );
    fireEvent.click(
      await within(region).findByRole(
        'button',
        { name: 'Run action' },
        { timeout: 15000 }
      )
    );
    expect(within(region).getByText('1 actions completed')).toBeInTheDocument();
    fireEvent.change(
      within(region).getByRole('textbox', { name: 'Playground children' }),
      { target: { value: 'Launch project' } }
    );
    expect(
      within(region).getByRole('button', { name: 'Launch project' })
    ).toBeInTheDocument();
    expect(within(region).getByText('1 actions completed')).toBeInTheDocument();
    fireEvent.click(within(region).getByRole('switch', { name: 'isDisabled' }));
    expect(
      within(region).getByRole('button', { name: 'Launch project' })
    ).toBeDisabled();
    fireEvent.click(within(region).getByRole('button', { name: 'Copy code' }));
    const expected = playgroundCopyCode(
      findComponentDefinition('Button')!.playground,
      { children: 'Launch project', isDisabled: true }
    );
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(expected));
    fireEvent.click(within(region).getByRole('button', { name: 'Code' }));
    expect(
      within(region).getByText(
        (_, node) => node?.tagName === 'CODE' && node.textContent === expected
      )
    ).toBeInTheDocument();
    fireEvent.click(
      within(region).getByRole('button', { name: 'Reset playground' })
    );
    fireEvent.click(within(region).getByRole('button', { name: 'Preview' }));
    expect(
      await within(region).findByRole('button', { name: 'Run action' })
    ).toBeEnabled();
    fireEvent.click(within(region).getByRole('button', { name: 'Copy code' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenLastCalledWith(
        findComponentDefinition('Button')!.playground.example.code
      )
    );
    await within(region).findByText('Copied');
    fireEvent.change(
      within(region).getByRole('textbox', { name: 'Playground children' }),
      { target: { value: 'Another label' } }
    );
    expect(within(region).queryByText('Copied')).not.toBeInTheDocument();
  } finally {
    if (originalClipboard)
      Object.defineProperty(navigator, 'clipboard', originalClipboard);
    else Reflect.deleteProperty(navigator, 'clipboard');
  }
}, 20000);

test('invalid playground JSON keeps the last valid props and can recover', async () => {
  show('/docs/Button');
  fireEvent.click(await screen.findByRole('button', { name: 'Playground' }));
  const region = await screen.findByRole(
    'region',
    {
      name: 'Component playground',
    },
    { timeout: 15000 }
  );
  await within(region).findByRole(
    'button',
    { name: 'Run action' },
    { timeout: 15000 }
  );
  fireEvent.click(within(region).getByText(/More props/));
  const number = within(region).getByRole('textbox', {
    name: 'Playground borderMovingDuration',
  });
  fireEvent.change(number, { target: { value: '3' } });
  fireEvent.change(number, { target: { value: 'Infinity' } });
  expect(number).toHaveAttribute('aria-invalid', 'true');
  const input = within(region).getByRole('textbox', {
    name: 'Playground views',
  });
  fireEvent.change(input, {
    target: { value: '{"container":{"padding":28}}' },
  });
  fireEvent.change(input, { target: { value: '{broken' } });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(
    within(region).getByText(/Enter a JSON object. Preview and code keep/)
  ).toBeInTheDocument();
  fireEvent.click(within(region).getByRole('button', { name: 'Code' }));
  expect(region.querySelector('pre.docs-example-code')).toHaveTextContent(
    'views={{"container":{"padding":28}}}'
  );
  expect(region.querySelector('pre.docs-example-code')).toHaveTextContent(
    'borderMovingDuration={3}'
  );
  fireEvent.change(input, { target: { value: '{}' } });
  expect(
    within(region).queryByText(/Enter a JSON object. Preview and code keep/)
  ).not.toBeInTheDocument();
}, 20000);

test('quick start renders the real controlled-input example', async () => {
  show('/docs/quick-start');
  const action = await screen.findByRole(
    'button',
    { name: 'Preview settings' },
    { timeout: 15000 }
  );
  const input = screen.getByRole('textbox', { name: 'Project name' });
  fireEvent.change(input, { target: { value: '' } });
  expect(action).toBeDisabled();
  fireEvent.change(input, { target: { value: 'Docs project' } });
  fireEvent.click(action);
  expect(
    screen.getByText('Docs project: notifications on.')
  ).toBeInTheDocument();
}, 20000);

test('an example render failure stays contained and leaves the source accessible', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const code = 'function Broken() { throw new Error("Example failure"); }';
  render(
    <CustomLiveCode
      code={code}
      originalCode={code}
      mainComponentName="Broken"
      scope={{ React }}
    />
  );
  expect(
    await screen.findByRole('alert', {}, { timeout: 15000 })
  ).toHaveTextContent('This example needs an update.');
  fireEvent.click(screen.getByRole('button', { name: 'Code' }));
  expect(document.querySelector('pre.docs-example-code')?.textContent).toBe(
    code
  );
}, 20000);

test('example preprocessing supports default exports, expressions, and static imports', () => {
  expect(
    prepareExample(
      "import React from 'react';\nexport default function Demo() { return <button>Ready</button>; }"
    )
  ).toEqual({
    code: 'function Demo() { return <button>Ready</button>; }',
    name: 'Demo',
  });
  expect(prepareExample('export default () => <span>Hello</span>')?.name).toBe(
    '__DocumentationExample'
  );
  expect(prepareExample('<button>Ready</button>')?.name).toBeNull();
  expect(
    prepareExample("import { Button } from '@app-studio/components';")
  ).toBeNull();
});

test('adjacent JSX elements render a working preview and keep the original source accessible', async () => {
  const code = '<button>Working preview</button>\n<span>Second element</span>';
  render(
    <ThemeProvider>
      <CustomLiveCode code={code} originalCode={code} scope={{ React }} />
    </ThemeProvider>
  );
  expect(
    await screen.findByRole(
      'button',
      { name: 'Working preview' },
      { timeout: 15000 }
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText('Second element', {
      selector: '.docs-example-preview span',
    })
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Code' }));
  expect(document.querySelector('pre.docs-example-code')?.textContent).toBe(
    code
  );
}, 20000);
