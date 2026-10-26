import React, { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Search } from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import { TextField } from 'src/components/Form/TextField/TextField';
import CustomLiveCode from './components/CustomLiveCode.component';
import { DocumentationCode } from './components/DocumentationCode';
import api from './component-api.json';
import { normalizeDocName } from './docs.config';
import type { PlaygroundDefinition } from './components/playground.utils';

const ComponentPlayground = lazy(
  () => import('./components/ComponentPlayground')
);

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
  values?: string[];
  source?: string;
  line: number;
}
interface PropertyGroup {
  name: string;
  props: Property[];
  inherited: Property[];
}
interface Example {
  file: string;
  exportName: string;
  code: string;
}
export interface ComponentDefinition {
  name: string;
  exportName: string;
  packageName: string | null;
  description: string;
  source: string;
  groups: PropertyGroup[];
  examples: Example[];
  playground: PlaygroundDefinition;
}
const definitions = api as Record<string, ComponentDefinition>;
export function findComponentDefinition(name = '') {
  return Object.entries(definitions).find(([key, item]) =>
    [key, item.name, item.exportName].some(
      (value) => normalizeDocName(value) === normalizeDocName(name)
    )
  )?.[1];
}
const exampleModules = import.meta.glob([
  '/src/components/**/examples/*.tsx',
  '/src/pages/docs/examples/*.tsx',
]);
const previews = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType>
>();
function previewFor(example: Example) {
  const key = example.file + '#' + example.exportName;
  if (!previews.has(key))
    previews.set(
      key,
      lazy(async () => {
        const load = exampleModules[example.file];
        if (!load) throw new Error('The example source could not be found.');
        const module = (await load()) as Record<string, React.ComponentType>;
        if (!module[example.exportName])
          throw new Error('The example export could not be found.');
        return { default: module[example.exportName] };
      })
    );
  return previews.get(key)!;
}
function exampleTitle(example: Example) {
  const file = example.file
    .split('/')
    .pop()!
    .replace(/\.tsx$/, '');
  if (file.includes('.'))
    return file
      .split('.')
      .pop()!
      .replace(/^./, (value) => value.toUpperCase());
  if (example.file.includes('/docs/examples/') || /default/i.test(file))
    return 'Basic usage';
  return file
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (value) => value.toUpperCase());
}
function PropsTable({ name, props }: { name: string; props: Property[] }) {
  return (
    <>
      <p className="docs-props-scroll-hint">
        Scroll horizontally to see every column.
      </p>
      <div
        className="docs-props-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${name} props table`}
      >
        <table className="docs-props-table">
          <caption>{name}</caption>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name}>
                <th scope="row">
                  <code>{prop.name}</code>
                  {prop.required && (
                    <>
                      {' '}
                      <span className="docs-required">Required</span>
                    </>
                  )}
                </th>
                <td>
                  {prop.type.length > 160 ? (
                    <details>
                      <summary>View type</summary>
                      <code>{prop.type}</code>
                    </details>
                  ) : (
                    <code>{prop.type}</code>
                  )}
                  {prop.values && (
                    <div className="docs-prop-values">
                      {prop.values.map((value) => (
                        <code key={value}>{value}</code>
                      ))}
                    </div>
                  )}
                </td>
                <td>
                  <code>{prop.defaultValue ?? '—'}</code>
                </td>
                <td>
                  {prop.description ||
                    'See the type and source declaration for this property.'}
                  {prop.source && (
                    <a
                      className="docs-prop-source"
                      href={`https://github.com/rize-network/app-studio-components/blob/main/${prop.source}#L${prop.line}`}
                      aria-label={`View definition of ${prop.name}`}
                    >
                      Source <ArrowUpRight size={10} />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ComponentReference({
  definition,
}: {
  definition: ComponentDefinition;
}) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('examples');
  const example = definition.examples[exampleIndex];
  const Preview = example && previewFor(example);
  const matches = (prop: Property) =>
    `${prop.name} ${prop.type} ${prop.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  const groups = definition.groups.map((group) => ({
    ...group,
    props: group.props.filter(matches),
    inherited: group.inherited.filter(matches),
  }));
  const sourceUrl =
    definition.packageName === 'app-studio'
      ? 'https://github.com/rize-network/app-studio'
      : `https://github.com/rize-network/app-studio-components/blob/main/${definition.source}`;
  const imports =
    definition.name === 'Formik'
      ? 'FormikForm, FormikTextField, FormikCheckbox'
      : definition.name === 'Message'
      ? 'MessageLayout, showMessage'
      : definition.exportName;
  return (
    <>
      <header className="docs-reference-heading">
        <div className="docs-reference-package">
          <Code2 size={13} />
          {definition.packageName || 'Repository module'}
        </div>
        <h1>{definition.name}</h1>
        <p>{definition.description}</p>
        <a href={sourceUrl}>
          View component source <ArrowUpRight size={13} />
        </a>
      </header>
      {!definition.packageName && (
        <blockquote>
          This module is available in the repository and is not exported from
          the published package. The example uses its repository import path.
          {definition.name === 'Label' && (
            <>
              {' '}
              For application forms, use the{' '}
              <Link to="/docs/TextField">TextField</Link> label prop.
            </>
          )}
        </blockquote>
      )}
      <h2>Import</h2>
      <DocumentationCode className="language-ts">{`import { ${imports} } from '${
        definition.packageName || definition.source.replace(/\.tsx$/, '')
      }';`}</DocumentationCode>
      <p>
        New to the library? Complete{' '}
        <Link to="/docs/installation">installation and provider setup</Link>{' '}
        first.
      </p>
      {definition.name === 'Formik' && (
        <p>
          Mount <code>FormikForm</code> inside Formik. Bind each field with{' '}
          <code>name</code>; the wrappers keep the props of their underlying
          controls. See the <Link to="/docs/forms">forms guide</Link> for
          validation and submission.
        </p>
      )}
      {example && Preview && (
        <section aria-label="Component examples">
          <h2>Interactive examples</h2>
          <p>Try the component, then open Code to copy the complete example.</p>
          <div
            className="docs-example-picker docs-example-modes"
            role="group"
            aria-label="Example mode"
          >
            <Button
              size="sm"
              variant={mode === 'examples' ? 'filled' : 'ghost'}
              aria-pressed={mode === 'examples'}
              onClick={() => setMode('examples')}
            >
              Examples
            </Button>
            <Button
              size="sm"
              variant={mode === 'playground' ? 'filled' : 'ghost'}
              aria-pressed={mode === 'playground'}
              onClick={() => setMode('playground')}
            >
              Playground
            </Button>
          </div>
          {mode === 'playground' ? (
            <Suspense fallback={<p role="status">Loading playground…</p>}>
              <ComponentPlayground definition={definition.playground} />
            </Suspense>
          ) : (
            <>
              {definition.examples.length > 1 && (
                <div
                  className="docs-example-picker"
                  role="group"
                  aria-label="Choose example"
                >
                  {definition.examples.map((item, index) => (
                    <Button
                      key={item.file}
                      size="sm"
                      variant={exampleIndex === index ? 'filled' : 'ghost'}
                      aria-pressed={exampleIndex === index}
                      onClick={() => setExampleIndex(index)}
                    >
                      {exampleTitle(item)}
                    </Button>
                  ))}
                </div>
              )}
              <CustomLiveCode
                key={example.file}
                code={example.code}
                originalCode={example.code}
                scope={{}}
                preview={
                  <Suspense fallback={<p role="status">Loading example…</p>}>
                    <Preview />
                  </Suspense>
                }
              />
            </>
          )}
        </section>
      )}
      <section aria-label="API reference">
        <h2>Props</h2>
        <p>
          Required props are marked below. A dash indicates an unspecified
          default. Design system configuration can override implementation
          defaults.
        </p>
        <div className="docs-props-search">
          <TextField
            aria-label="Filter props"
            placeholder="Find a prop, type, or behavior…"
            value={query}
            onChange={setQuery}
            isClearable
            left={<Search size={15} />}
          />
        </div>
        {groups.every(
          (group) => group.props.length === 0 && group.inherited.length === 0
        ) && <p role="status">No props match “{query}”.</p>}
        {groups.map((group, index) => (
          <React.Fragment key={group.name}>
            {group.props.length > 0 && (
              <>
                {index > 0 && <h3>{group.name}</h3>}
                <PropsTable name={group.name} props={group.props} />
              </>
            )}
            {group.inherited.length > 0 && (
              <details
                className="docs-inherited-props"
                open={query.trim() ? true : undefined}
              >
                <summary>
                  Common inherited styling props ({group.inherited.length})
                </summary>
                <PropsTable
                  name={`${group.name} inherited`}
                  props={group.inherited}
                />
              </details>
            )}
          </React.Fragment>
        ))}
        <p className="docs-api-note">
          For shared layout, color, and responsive properties, read{' '}
          <Link to="/docs/styling">Styling & composition</Link> and{' '}
          <Link to="/docs/responsive">Responsive layouts</Link>. Additional
          native element attributes depend on the target platform.
        </p>
      </section>
      <h2>Usage guidance</h2>
      <ul>
        <li>
          Give controls a visible label or an accessible name, and verify
          keyboard interaction. See{' '}
          <Link to="/docs/accessibility">Accessibility</Link>.
        </li>
        <li>
          For controlled inputs, update the value from the callback shown in the
          props table. Keep application state in your component or form library.
        </li>
        <li>
          These previews run in the browser. Check{' '}
          <Link to="/docs/react-native">React Native setup</Link> for platform
          requirements and differences.
        </li>
      </ul>
    </>
  );
}
