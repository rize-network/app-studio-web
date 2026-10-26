import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ResponsiveProvider } from 'app-studio';
import { afterEach, expect, test, vi } from 'vitest';
import { HomeHero } from 'src/pages/HomeHero';
import AppStudioPage from 'src/pages/appStudio.page';
import App from 'src/App';
import { CopyCode } from 'src/pages/marketing/MarketingLayout';
import { loadDocs } from 'src/docsLoader';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function show(page: React.ReactNode, path = '/') {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider>
          <ResponsiveProvider>{page}</ResponsiveProvider>
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

test.each([
  ['/', 'Your styles.', 'App Studio', '/'],
  ['/components', 'React UI.', 'Components', '/components'],
  ['/app-studio', 'Your styles.', 'App Studio', '/'],
])(
  '%s shows the correct landing page and active navigation',
  async (path, title, link, canonicalPath) => {
    show(<App />, path);
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      title
    );
    expect(
      screen.getByRole('link', { name: link, current: 'page' })
    ).toHaveAttribute('href', canonicalPath);
    await waitFor(() =>
      expect(
        document.head.querySelector('link[rel="canonical"]')
      ).toHaveAttribute(
        'href',
        `https://app-studio-6167b.web.app${canonicalPath}`
      )
    );
  }
);

test('components page links to setup and runs the real controlled-input demo', () => {
  show(<HomeHero />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'React UI.'
  );
  expect(screen.getByRole('link', { name: 'App Studio' })).toHaveAttribute(
    'href',
    '/'
  );
  expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute(
    'href',
    '/docs'
  );
  const input = screen.getByRole('textbox', { name: 'Project name' });
  fireEvent.change(input, { target: { value: '' } });
  expect(
    screen.getByRole('button', { name: 'Create a project' })
  ).toBeDisabled();
  fireEvent.change(input, { target: { value: 'A good idea' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create a project' }));
  expect(screen.getByText(/“A good idea” is ready/)).toBeInTheDocument();
  const notifications = screen.getByRole('switch', {
    name: 'Enable notifications',
  });
  fireEvent.click(notifications);
  expect(notifications).not.toBeChecked();
  fireEvent.click(screen.getByRole('tab', { name: 'Code' }));
  expect(screen.getByText(/Make it yours/)).toBeInTheDocument();
});

test('core preview updates the displayed props and palette', () => {
  show(<AppStudioPage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /Your styles\.\s*Your components\.\s*One API\./
  );
  const code = screen.getByLabelText('YourComponent.tsx code example');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle preview theme' }));
  expect(code).toHaveTextContent('color-gray-900');
  fireEvent.click(
    screen.getByRole('button', { name: 'Toggle compact spacing' })
  );
  expect(code).toHaveTextContent('padding={12}');
  fireEvent.click(screen.getByRole('button', { name: 'Use violet palette' }));
  expect(code).toHaveTextContent('color-violet-200');
  expect(
    screen.getByRole('button', { name: 'Use violet palette' })
  ).toHaveAttribute('aria-pressed', 'true');
});

test('mobile navigation opens and closes after following a link', () => {
  show(<HomeHero />);
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  expect(
    screen.getByRole('button', { name: 'Close navigation' })
  ).toHaveAttribute('aria-expanded', 'true');
  const link = screen.getByRole('link', { name: 'Documentation' });
  link.addEventListener('click', (event) => event.preventDefault());
  fireEvent.click(link);
  expect(
    screen.getByRole('button', { name: 'Open navigation' })
  ).toHaveAttribute('aria-expanded', 'false');
});

test('mobile navigation dismisses with Escape and an outside touch', () => {
  show(<HomeHero />);
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  fireEvent.pointerDown(document.body);
  expect(
    screen.getByRole('button', { name: 'Open navigation' })
  ).toHaveAttribute('aria-expanded', 'false');
});

test('copy reports success and clipboard failures without throwing', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
  show(<CopyCode code="npm install app-studio" />);
  fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('Copied')
  );
  expect(writeText).toHaveBeenCalledWith('npm install app-studio');
  writeText.mockRejectedValueOnce(new Error('Unavailable'));
  fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      'Select and copy the code manually.'
    )
  );
});

test('both setup destinations are loaded and compile in the existing MDX renderer', async () => {
  const docs = await loadDocs();
  for (const name of ['GettingStarted', 'AppStudio']) {
    const guide = docs.find((doc) => doc.componentName === name);
    expect(guide).toBeDefined();
    const compiled = await evaluate(guide!.content as string, { ...runtime });
    expect(compiled.default).toBeTypeOf('function');
  }
});

test('setup guide renders inline code within paragraphs and working code examples', async () => {
  const { default: DocsPage } = await import('src/pages/docs/docs.page');
  const { container } = show(
    <Routes>
      <Route path="/docs/:componentName" element={<DocsPage />} />
    </Routes>,
    '/docs/AppStudio'
  );
  expect(
    await screen.findByRole(
      'heading',
      { name: 'App Studio foundations' },
      { timeout: 15000 }
    )
  ).toBeInTheDocument();
  expect(container.querySelector('.docs-prose p pre')).toBeNull();
  expect(container.querySelector('.docs-prose p code')).toHaveTextContent(
    'app-studio'
  );
  expect(
    screen.getByRole('heading', { name: 'Layout primitives' })
  ).toBeInTheDocument();
});
