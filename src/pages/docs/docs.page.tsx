import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileText,
  List,
} from 'lucide-react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/react';
import { loadDocs } from 'src/docsLoader';
import { documentationMdxComponents } from './components/DocumentationCode';
import { findGuide, guidePages, normalizeDocName } from './docs.config';
import ComponentReference, {
  findComponentDefinition,
} from './ComponentReference';
import './docs.css';

type Heading = { id: string; title: string };
const contentCache = new Map<string, React.ComponentType>();

export async function prepareDocumentation(componentName = 'overview') {
  const guide = findGuide(componentName);
  const key = normalizeDocName(guide?.slug || componentName);
  const cached = contentCache.get(key);
  if (cached) return cached;
  const definition = !guide && findComponentDefinition(componentName);
  let Content: React.ComponentType;
  if (definition) {
    Content = () => <ComponentReference definition={definition} />;
  } else {
    const docs = await loadDocs();
    const name = guide?.alias || guide?.slug || componentName;
    const doc = docs.find(
      (item) => normalizeDocName(item.componentName) === normalizeDocName(name)
    );
    if (!doc)
      throw new Error('This guide or component reference could not be found.');
    if (!doc.content) throw new Error('This documentation source is empty.');
    const evaluated = await evaluate(doc.content as string, {
      ...runtime,
      development: false,
      useMDXComponents: () => documentationMdxComponents,
    });
    Content = evaluated.default as React.ComponentType;
  }
  contentCache.set(key, Content);
  return Content;
}

const DocsPage = () => {
  const { componentName } = useParams<{ componentName: string }>();
  const location = useLocation();
  const guide = findGuide(componentName);
  const cached = contentCache.get(
    normalizeDocName(guide?.slug || componentName || 'overview')
  );
  const [Content, setContent] = useState<React.ComponentType | null>(
    () => cached || null
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!cached);
  const [toc, setToc] = useState<Heading[]>([]);
  const article = useRef<HTMLElement | null>(null);
  const title = guide?.title || componentName || 'Documentation';
  const guideIndex = guidePages.findIndex((item) => item.slug === guide?.slug);

  useEffect(() => {
    let cancelled = false;
    setLoading(!cached);
    setError('');
    setContent(() => cached || null);
    setToc([]);
    const load = async () => {
      try {
        const loaded = await prepareDocumentation(componentName);
        if (!cancelled) {
          setContent(() => loaded);
        }
      } catch (problem) {
        if (!cancelled)
          setError(
            problem instanceof Error
              ? problem.message
              : 'The documentation could not be loaded.'
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [componentName, guide?.slug]);

  useEffect(() => {
    if (!Content || !article.current) return;
    const counts = new Map<string, number>();
    const headings = Array.from(
      article.current.querySelectorAll<HTMLHeadingElement>('h2, h3')
    ).filter((element) => !element.closest('.docs-example'));
    setToc(
      headings.map((element) => {
        const text = element.textContent || '';
        const base =
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'section';
        const count = counts.get(base) || 0;
        counts.set(base, count + 1);
        element.id = count ? `${base}-${count + 1}` : base;
        return { id: element.id, title: text };
      })
    );
    const target = headings.find(
      (element) => `#${element.id}` === location.hash
    );
    target?.scrollIntoView();
  }, [Content]);

  return (
    <>
      {loading && (
        <div className="docs-loading" role="status">
          <span className="docs-label">DOCUMENTATION</span>
          <p>Loading {title}…</p>
          <div />
          <div />
          <div />
        </div>
      )}
      {error && (
        <div className="docs-empty" role="alert">
          <span className="docs-label">DOCUMENTATION</span>
          <h1>We couldn't open this page.</h1>
          <p>{error}</p>
          <div>
            <Link to="/docs/installation">
              Installation <ArrowRight size={14} />
            </Link>
            <Link to="/docs/components">
              Browse components <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
      {!loading && !error && Content && (
        <div className="docs-article-layout">
          <div>
            <div className="docs-article-meta">
              <span className="docs-label">
                {guide ? guide.section.toUpperCase() : 'COMPONENT REFERENCE'}
              </span>
              <span>
                <FileText size={12} /> {guide ? 'Guide' : 'Reference'}
              </span>
            </div>
            {toc.length > 0 && (
              <details className="docs-mobile-toc">
                <summary>
                  <List size={14} /> On this page
                </summary>
                {toc.map((heading) => (
                  <a key={heading.id} href={`#${heading.id}`}>
                    {heading.title}
                  </a>
                ))}
              </details>
            )}
            <article className="docs-prose" ref={article}>
              <MDXProvider components={documentationMdxComponents}>
                <Content />
              </MDXProvider>
            </article>
            <div className="docs-article-end">
              <a href="https://github.com/rize-network/app-studio-components/tree/main/docs">
                <FileText size={13} /> Browse documentation source{' '}
                <ArrowUpRight size={13} />
              </a>
            </div>
            {guideIndex >= 0 && (
              <nav
                className="docs-page-pagination"
                aria-label="Documentation pages"
              >
                {guideIndex > 0 ? (
                  <Link
                    to={
                      guideIndex === 1
                        ? '/docs'
                        : `/docs/${guidePages[guideIndex - 1].slug}`
                    }
                  >
                    <span>
                      <ArrowLeft size={13} /> Previous
                    </span>
                    <strong>{guidePages[guideIndex - 1].title}</strong>
                  </Link>
                ) : (
                  <span />
                )}
                {guideIndex < guidePages.length - 1 && (
                  <Link to={`/docs/${guidePages[guideIndex + 1].slug}`}>
                    <span>
                      Next <ArrowRight size={13} />
                    </span>
                    <strong>{guidePages[guideIndex + 1].title}</strong>
                  </Link>
                )}
              </nav>
            )}
          </div>
          <aside className="docs-toc" aria-label="On this page">
            <span>ON THIS PAGE</span>
            {toc.map((heading) => (
              <a key={heading.id} href={`#${heading.id}`}>
                {heading.title}
              </a>
            ))}
            <Link to="/docs/components" className="docs-toc-card">
              <strong>Find your next component</strong>
              <span>
                Reference + working examples <ArrowUpRight size={13} />
              </span>
            </Link>
          </aside>
        </div>
      )}
    </>
  );
};

export default DocsPage;
