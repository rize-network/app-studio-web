import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Github,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import { HighlightedCode } from 'src/pages/code/HighlightedCode';
import './marketing.css';

export function CopyCode({
  code,
  label = 'Copy code',
}: {
  code: string;
  label?: string;
}) {
  const [status, setStatus] = useState({ code: '', text: '' });
  const currentStatus = status.code === code ? status.text : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus({ code, text: 'Copied' });
    } catch {
      setStatus({ code, text: 'Select and copy the code manually.' });
    }
  };
  return (
    <div className="m-copy">
      <Button
        variant="ghost"
        size="sm"
        textColor="inherit"
        ariaLabel={label}
        onClick={copy}
      >
        {currentStatus === 'Copied' ? <Check size={15} /> : <Copy size={15} />}
      </Button>
      <span role="status" className="m-copy-status">
        {currentStatus}
      </span>
    </div>
  );
}

export function CodeWindow({
  code,
  filename = 'App.tsx',
  children,
}: {
  code: string;
  filename?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="m-code-window">
      <div className="m-code-bar">
        <span className="m-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{filename}</span>
        <CopyCode code={code} />
      </div>
      <pre tabIndex={0} aria-label={`${filename} code example`}>
        <span className="m-line-number" aria-hidden="true">
          {code
            .split('\n')
            .map((_, index) => index + 1)
            .join('\n')}
        </span>
        <HighlightedCode code={code} />
      </pre>
      {children}
    </div>
  );
}

export function SiteHeader({
  product = 'components',
  documentation = false,
}: {
  product?: 'components' | 'studio';
  documentation?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent | PointerEvent) => {
      if (
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Escape'
      ) {
        setMenuOpen(false);
        header.current
          ?.querySelector<HTMLButtonElement>('.m-menu-toggle')
          ?.focus();
      } else if (
        event.type === 'pointerdown' &&
        !header.current?.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [menuOpen]);
  const studio = product === 'studio';
  const repo = `https://github.com/rize-network/${
    studio ? 'app-studio' : 'app-studio-components'
  }`;
  const docs = '/docs';
  return (
    <header className="m-header" ref={header}>
      <div className="m-container m-header-inner">
        <a href="/" className="m-brand" aria-label="App Studio home">
          <span className="m-brand-mark">
            <Layers size={23} strokeWidth={2.4} />
          </span>
          app studio<span className="m-brand-divider">/</span>
          <span className="m-brand-product">
            {documentation ? 'docs' : studio ? 'core' : 'components'}
          </span>
        </a>
        <Button
          className="m-menu-toggle"
          variant="ghost"
          size="sm"
          ariaLabel={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="marketing-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </Button>
        <nav
          id="marketing-navigation"
          className={`m-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          <a
            href="/"
            aria-current={!documentation && studio ? 'page' : undefined}
          >
            App Studio
          </a>
          <a
            href="/components"
            aria-current={!documentation && !studio ? 'page' : undefined}
          >
            Components
          </a>
          <a href={docs} aria-current={documentation ? 'page' : undefined}>
            Documentation
          </a>
          <a
            className="m-github"
            href={repo}
            aria-label="View source on GitHub"
          >
            <Github size={18} />
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            className="m-link-button m-link-button-small"
            href={documentation ? '/docs/installation' : '#get-started'}
          >
            Start building <ArrowRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function MarketingLayout({
  product,
  children,
}: {
  product: 'components' | 'studio';
  children: React.ReactNode;
}) {
  const studio = product === 'studio';
  const repo = `https://github.com/rize-network/${
    studio ? 'app-studio' : 'app-studio-components'
  }`;
  const docs = studio ? '/docs/core' : '/docs/installation';
  return (
    <div className={`marketing ${studio ? 'marketing-studio' : ''}`}>
      <a className="m-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader product={product} />
      <main id="main">{children}</main>
      <footer className="m-footer m-container">
        <div>
          <a href="/" className="m-brand">
            <span className="m-brand-mark">
              <Layers size={20} />
            </span>
            app studio
          </a>
          <p>A thoughtful foundation for what comes next.</p>
          <span className="m-mono">
            {studio
              ? 'Open source. MIT licensed. Yours to build with.'
              : 'Source available. Built in the open.'}
          </span>
        </div>
        <div>
          <span className="m-footer-title">THE ECOSYSTEM</span>
          <a href="/">App Studio core</a>
          <a href="/components">Components</a>
          <a href="/design-system">Design system</a>
        </div>
        <div>
          <span className="m-footer-title">FOR DEVELOPERS</span>
          <a href="/docs/quick-start">Quick start</a>
          <a href="/docs/Button">Component reference</a>
          <a href="/docs/ai-assistants">AI documentation</a>
          <a href={repo}>
            Source code <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="m-footer-bottom">
          <span>© {new Date().getFullYear()} App Studio</span>
          <span>Built with our own components ↗</span>
        </div>
      </footer>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="m-section-heading">
      <span className="m-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function QuickStart({
  studio = false,
  code,
}: {
  studio?: boolean;
  code: string;
}) {
  const command = studio
    ? 'npm install app-studio'
    : 'npm install @app-studio/components app-studio';
  const docs = studio ? '/docs/core' : '/docs/installation';
  return (
    <section id="get-started" className="m-section m-container m-quickstart">
      <div>
        <span className="m-eyebrow">FROM IDEA TO FIRST RENDER</span>
        <h2>
          Install. Configure.
          <br />
          Build.
        </h2>
        <p>
          Start with your existing React project. Add the package, wrap your
          app, and make it yours.
        </p>
        <ol className="m-steps">
          <li>
            <span>01</span>
            <div>
              <h3>Install your foundation</h3>
              <p>
                {studio
                  ? 'The styling engine works on its own.'
                  : 'The component library uses App Studio for styling.'}
              </p>
              <div className="m-terminal">
                <span aria-hidden="true">$</span>
                <code>{command}</code>
                <CopyCode code={command} label="Copy install command" />
              </div>
              <a href={docs}>
                Check platform requirements and peer dependencies{' '}
                <ArrowUpRight size={12} />
              </a>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Set up your providers</h3>
              <p>
                ThemeProvider resolves your color tokens. ResponsiveProvider
                enables device-aware layouts.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Build something that feels like you</h3>
              <p>
                Use typed props and your own theme. Keep your existing React
                tools.
              </p>
            </div>
          </li>
        </ol>
      </div>
      <CodeWindow code={code}>
        <div className="m-code-foot">
          <span>
            <span className="m-status-dot" /> Ready for your React project
          </span>
          <a href={docs}>
            Full setup guide <ArrowUpRight size={13} />
          </a>
        </div>
      </CodeWindow>
    </section>
  );
}

export function DeveloperResources({ studio = false }: { studio?: boolean }) {
  const resources = studio
    ? [
        [
          '01',
          'Understand the foundations',
          'Style props, theme tokens, responsive layouts, and your first component.',
          '/docs/core',
        ],
        [
          '02',
          'Go deeper into the API',
          'Styling states, animations, hooks, providers, and composition.',
          'https://github.com/rize-network/app-studio/blob/main/docs/README.md',
        ],
        [
          '03',
          'Take it to native',
          'Native mappings, optional peers, and the web APIs that differ.',
          'https://github.com/rize-network/app-studio/blob/main/docs/Native.md',
        ],
      ]
    : [
        [
          '01',
          'Your first component',
          'Installation, providers, peer dependencies, and a working example.',
          '/docs/installation',
        ],
        [
          '02',
          'Explore the components',
          'Props, variants, and interactive examples. Find your next building block.',
          '/docs/Button',
        ],
        [
          '03',
          'Understand the engine',
          'See how App Studio handles styling, themes, and responsive layouts.',
          '/',
        ],
      ];
  return (
    <section id="documentation" className="m-section m-resources">
      <div className="m-container">
        <SectionHeading
          eyebrow="A LITTLE GUIDANCE GOES A LONG WAY"
          title="Built for the way developers learn."
        >
          Start with a working example. Understand the decisions. Go deeper when
          you need to.
        </SectionHeading>
        <div className="m-resource-grid">
          {resources.map(([n, title, text, href]) => (
            <a href={href} className="m-resource" key={n}>
              <span className="m-mono">
                {n} / GUIDE <ArrowUpRight size={17} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="m-resource-cta">
                Open the guide <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Questions({ studio = false }: { studio?: boolean }) {
  const questions = studio
    ? [
        [
          'How is App Studio different from the component library?',
          'App Studio is the foundation: layout primitives, style props, tokens, hooks, and animations. @app-studio/components adds ready-made controls such as buttons, dialogs, and forms. Use the engine alone or use both together.',
        ],
        [
          'Do I have to replace my existing styling?',
          'No. Start with a View or a layout in one part of your React app. App Studio can sit alongside your existing components and styles. Theme tokens need ThemeProvider; responsive device names need ResponsiveProvider.',
        ],
        [
          'Does exactly the same code work on web and native?',
          'The package selects a dedicated build for each platform and shares its styling API. Native uses a supported subset: browser selectors and CSS Grid do not map one-to-one. Check the native guide before sharing a screen.',
        ],
        [
          'Can I use it in a commercial project?',
          'Yes. App Studio is open source under the MIT license. You can inspect the implementation, adapt it, and use it in commercial applications.',
        ],
      ]
    : [
        [
          'Which package should I start with?',
          'Choose @app-studio/components for ready-made UI and install app-studio alongside it. Choose app-studio alone when you want to build your own components from layout and styling primitives.',
        ],
        [
          'Can I make the components match my brand?',
          'Yes. Use ThemeProvider for shared color tokens, component props for variants and sizes, and the views prop to style internal parts. Start with one component before creating a shared design system.',
        ],
        [
          'What does React Native support include?',
          'The library ships dedicated native implementations with a shared public API. Availability and behavior depend on the component; some controls are web-only and some native features need optional peers. The setup guide links to the compatibility matrix.',
        ],
        [
          'Where can I check the source and license?',
          'Both repositories are public on GitHub. Review the LICENSE file included with the version you adopt. The component repository currently has conflicting license information between its README and LICENSE; confirm the terms before commercial use.',
        ],
      ];
  return (
    <section className="m-section m-container m-faq">
      <SectionHeading eyebrow="GOOD QUESTIONS" title="A few things to know." />
      <div>
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <ChevronDown size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCallout({ studio = false }: { studio?: boolean }) {
  return (
    <section className="m-container m-final">
      <div className="m-mono">
        <span className="m-status-dot" /> YOUR NEXT PROJECT STARTS HERE
      </div>
      <h2>
        {studio ? (
          <>
            Your ideas.
            <br />A better foundation.
          </>
        ) : (
          <>
            Make your next
            <br />
            interface a great one.
          </>
        )}
      </h2>
      <div className="m-actions">
        <a className="m-link-button" href="#get-started">
          Start building <ArrowRight size={17} />
        </a>
        <a
          className="m-text-link"
          href={studio ? '/docs/core' : '/docs/installation'}
        >
          Read the documentation <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
