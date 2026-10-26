import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Github,
  Layers,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import { TextField } from 'src/components/Form/TextField/TextField';
import { SiteHeader } from 'src/pages/marketing/MarketingLayout';
import { documentationBreadcrumbs, getPageMetadata } from 'src/seo';
import {
  componentCategories,
  componentReference,
  documentationComponents,
  findGuide,
  guidePages,
} from './docs.config';
import './docs.css';

export default function DocumentationLayout() {
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const guide = pathname.startsWith('/docs')
    ? findGuide(pathname.split('/')[2])
    : undefined;
  const component = documentationComponents.find(
    (item) =>
      item.path.toLowerCase() === pathname.toLowerCase() ||
      componentReference(item.name)?.toLowerCase() === pathname.toLowerCase()
  );
  const examples = Boolean(
    component?.examplePath &&
      component.examplePath.toLowerCase() === pathname.toLowerCase()
  );
  const componentMode = Boolean(component || pathname === '/docs/components');
  const matches = (title: string) =>
    title.toLowerCase().includes(query.trim().toLowerCase());
  const guides = guidePages.filter((item) => matches(item.title));
  const components = documentationComponents.filter((item) =>
    matches(item.name)
  );

  useEffect(() => {
    setMenuOpen(false);
    setQuery('');
    if (!window.location.hash) window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    document.getElementById('docs-sidebar')?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('docs-navigation-toggle')?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !document.getElementById('docs-sidebar')?.contains(target) &&
        !document.getElementById('docs-navigation-toggle')?.contains(target)
      )
        setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <div className="marketing docs-site">
      <a className="m-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader documentation />
      <div className="docs-mobile-tools">
        <Button
          id="docs-navigation-toggle"
          variant="ghost"
          size="sm"
          ariaLabel={
            menuOpen
              ? 'Close documentation navigation'
              : 'Open documentation navigation'
          }
          aria-expanded={menuOpen}
          aria-controls="docs-sidebar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />} Browse documentation
        </Button>
        <Link to="/docs/components">
          <Layers size={15} /> Components
        </Link>
      </div>
      <div className="docs-layout">
        <aside
          id="docs-sidebar"
          className={`docs-sidebar ${menuOpen ? 'is-open' : ''}`}
          aria-label="Documentation navigation"
          tabIndex={-1}
        >
          <div className="docs-sidebar-title">
            <BookOpen size={16} />
            <span>Documentation</span>
            <span className="docs-version">React + Native</span>
          </div>
          <div className="docs-search">
            <TextField
              aria-label="Search documentation"
              placeholder="Search documentation…"
              size="sm"
              value={query}
              onChange={setQuery}
              isClearable
              left={<Search size={15} />}
            />
          </div>
          <div className="docs-nav-switch" aria-label="Documentation sections">
            <Link to="/docs" aria-current={!componentMode ? 'true' : undefined}>
              <BookOpen size={14} /> Guides
            </Link>
            <Link
              to="/docs/components"
              aria-current={componentMode ? 'true' : undefined}
            >
              <Layers size={14} /> Components
            </Link>
          </div>
          <nav
            aria-label="Guides and components"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a'))
                setMenuOpen(false);
            }}
          >
            {(!componentMode || query.trim()) &&
              ['Getting started', 'Foundations', 'Guides'].map((section) => {
                const items = guides.filter((item) => item.section === section);
                return (
                  items.length > 0 && (
                    <div className="docs-nav-group" key={section}>
                      <h2>{section}</h2>
                      {items.map((item) => (
                        <Link
                          key={item.slug}
                          to={
                            item.slug === 'overview'
                              ? '/docs'
                              : `/docs/${item.slug}`
                          }
                          aria-current={
                            guide?.slug === item.slug ? 'page' : undefined
                          }
                        >
                          <span className="docs-nav-dot" />
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )
                );
              })}
            {(componentMode || query.trim()) && (
              <div className="docs-nav-group">
                <h2>Component library</h2>
                <Link
                  to="/docs/components"
                  aria-current={
                    pathname === '/docs/components' ? 'page' : undefined
                  }
                >
                  <Layers size={14} />
                  All components{' '}
                  <span className="docs-nav-count">
                    {documentationComponents.length}
                  </span>
                </Link>
                {componentCategories.map((category) => {
                  const items = components.filter(
                    (item) => item.category === category
                  );
                  return (
                    items.length > 0 && (
                      <details
                        key={category}
                        open={
                          Boolean(query.trim()) ||
                          component?.category === category
                        }
                      >
                        <summary>
                          {category}
                          <ChevronRight size={13} />
                        </summary>
                        {items.map((item) => (
                          <Link
                            key={item.path}
                            to={componentReference(item.name) || item.path}
                            aria-current={
                              component?.path === item.path ? 'page' : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </details>
                    )
                  );
                })}
              </div>
            )}
            {query.trim() && guides.length === 0 && components.length === 0 && (
              <p className="docs-no-results" role="status">
                No results for “{query}”. Try a guide or component name.
              </p>
            )}
          </nav>
          <a
            className="docs-source-link"
            href="https://github.com/rize-network/app-studio-components"
          >
            <Github size={15} /> View the source <ArrowUpRight size={13} />
          </a>
        </aside>
        <main id="main" className="docs-main" ref={mainRef} tabIndex={-1}>
          <nav className="docs-breadcrumb" aria-label="Breadcrumb">
            {documentationBreadcrumbs(getPageMetadata(pathname).path).map(
              (item, index, items) => (
                <React.Fragment key={item.path}>
                  {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
                  {index === items.length - 1 ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <Link to={item.path}>{item.name}</Link>
                  )}
                </React.Fragment>
              )
            )}
          </nav>
          {component && (
            <>
              <div
                className="docs-component-tabs"
                aria-label={`${component.name} pages`}
              >
                {componentReference(component.name) && (
                  <Link
                    to={componentReference(component.name)!}
                    aria-current={!examples ? 'page' : undefined}
                  >
                    Reference
                  </Link>
                )}
                {component.examplePath && (
                  <Link
                    to={component.examplePath}
                    aria-current={examples ? 'page' : undefined}
                  >
                    Examples <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
              {examples && (
                <header className="docs-page-heading">
                  <span className="docs-label">COMPONENT EXAMPLES</span>
                  <h1>{component.name}</h1>
                  <p>
                    Explore the existing variants and interactions. Use the
                    reference for props and usage.
                  </p>
                </header>
              )}
            </>
          )}
          <Outlet />
          <footer className="docs-footer">
            <Link to="/docs/ai-assistants">AI & coding assistants</Link>
            <Link to="/docs/components">
              Explore components <ArrowRight size={13} />
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
