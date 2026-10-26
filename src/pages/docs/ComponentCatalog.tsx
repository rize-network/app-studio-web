import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Component, Search } from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import { TextField } from 'src/components/Form/TextField/TextField';
import { ComponentShowcase } from 'src/pages/marketing/ComponentShowcase';
import {
  componentCategories,
  componentReference,
  documentationComponents,
} from './docs.config';

export default function ComponentCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const components = documentationComponents.filter(
    (item) =>
      (category === 'All' || item.category === category) &&
      item.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  return (
    <>
      <header className="docs-page-heading">
        <span className="docs-label">COMPONENT LIBRARY</span>
        <h1>Find your building blocks.</h1>
        <p>
          Browse the library, try a few controls, then open a component’s
          reference or its existing examples.
        </p>
      </header>
      <div className="docs-catalog-preview">
        <div>
          <span className="docs-label">TRY THE REAL THING</span>
          <h2>Components you can interact with.</h2>
          <p>
            These controls use the library itself. Toggle an option or switch
            between preview and code.
          </p>
          <Link to="/docs/quick-start">
            Build your first interface <ArrowRight size={14} />
          </Link>
        </div>
        <ComponentShowcase />
      </div>
      <div className="docs-catalog-controls">
        <TextField
          aria-label="Filter components"
          placeholder="Find a component…"
          value={query}
          onChange={setQuery}
          isClearable
          left={<Search size={16} />}
        />
        <div
          className="docs-category-filters"
          role="group"
          aria-label="Component category"
        >
          {['All', ...componentCategories].map((item) => (
            <Button
              key={item}
              variant={category === item ? 'filled' : 'ghost'}
              size="sm"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <p
        className="docs-result-count"
        role="status"
        aria-label="Component results"
      >
        {components.length} component{components.length === 1 ? '' : 's'}
        {category !== 'All' ? ` in ${category}` : ''}
      </p>
      <div className="docs-component-grid">
        {components.map((item) => {
          const reference = componentReference(item.name);
          return (
            <article className="docs-component-card" key={item.path}>
              <span className="docs-card-category">
                <Component size={16} />
                {item.category}
              </span>
              <h2>
                <Link to={reference || item.path}>{item.name}</Link>
              </h2>
              <p>
                Explore the {item.name} component, its variants, and its
                interactions.
              </p>
              <div>
                {reference && (
                  <Link to={reference}>
                    Reference <ArrowRight size={13} />
                  </Link>
                )}
                {item.examplePath && (
                  <Link to={item.examplePath}>
                    View examples <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {components.length === 0 && (
        <div className="docs-empty">
          <h2>No matching components</h2>
          <p>Try another name or reset your filters.</p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
    </>
  );
}
