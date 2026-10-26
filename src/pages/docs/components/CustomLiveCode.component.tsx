// File: src/pages/docs/components/CustomLiveCode.component.tsx
import React, { useState, useEffect, useRef, Fragment } from 'react';
import type { BabelFileResult, TransformOptions } from '@babel/standalone';
import { Button } from 'src/components/Button/Button';
import { CopyCode } from 'src/pages/marketing/MarketingLayout';
import { HighlightedCode } from 'src/pages/code/HighlightedCode';

// Lazy-load @babel/standalone to keep it out of the main bundle (~534KB)
let cachedTransform: typeof import('@babel/standalone').transform | null = null;
const loadBabel = async () => {
  if (!cachedTransform) {
    const babel = await import('@babel/standalone');
    cachedTransform = babel.transform;
  }
  return cachedTransform;
};

interface CustomLiveCodeProps {
  code: string; // The processed code to be transpiled and run
  originalCode: string; // The original code from MDX, for display
  scope: Record<string, any>;
  language?: string;
  mainComponentName?: string | null;
  preview?: React.ReactNode;
  modules?: Record<string, unknown>;
}

const CustomLiveCode: React.FC<CustomLiveCodeProps> = ({
  code,
  originalCode,
  scope,
  language = 'jsx',
  mainComponentName,
  preview: compiledPreview,
  modules,
}) => {
  const [activeView, setActiveView] = useState('preview');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [renderedElement, setRenderedElement] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingBabel, setIsLoadingBabel] = useState(false);
  const hasCompiledPreview = compiledPreview !== undefined;
  const sourceRef = useRef(originalCode);
  sourceRef.current = originalCode;

  useEffect(() => {
    if (hasCompiledPreview) return;
    if (!code || typeof code !== 'string' || !code.trim()) {
      setRenderedElement(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const transpileAndRun = async () => {
      let transpiledCode: string | null | undefined = '';
      try {
        setIsLoadingBabel(true);
        const transform = await loadBabel();
        if (cancelled) return;
        setIsLoadingBabel(false);

        const babelOptions: TransformOptions = {
          presets: [
            'react',
            ['typescript', { allExtensions: true, isTSX: true }],
          ],
          filename: 'live-code.tsx',
          ...(modules ? { plugins: ['transform-modules-commonjs'] } : {}),
        };

        const babelResult: BabelFileResult | null = transform(
          !mainComponentName && code.trim().startsWith('<')
            ? `<>${code.trim().replace(/;\s*$/, '')}</>`
            : code,
          babelOptions
        );
        transpiledCode = babelResult?.code;

        if (!transpiledCode) {
          throw new Error(
            'Babel transpilation resulted in empty or null code.'
          );
        }

        const completeScope = {
          React,
          Fragment,
          ...scope,
        };
        const scopeKeys = Object.keys(completeScope);
        const scopeValues = scopeKeys.map((key) => completeScope[key]);

        let executionBody: string;
        if (modules) {
          executionBody = `${transpiledCode}; return exports[${JSON.stringify(
            mainComponentName || 'default'
          )}];`;
        } else if (mainComponentName) {
          executionBody = `
          ${transpiledCode};
          if (typeof ${mainComponentName} !== 'undefined') {
            return ${mainComponentName};
          } else {
            throw new Error("Component '${mainComponentName}' was not defined or found in the provided code.");
          }
        `;
        } else {
          executionBody = `return (${transpiledCode.replace(/;\s*$/, '')});`;
        }

        const evaluatedFunc = new Function(
          ...scopeKeys,
          ...(modules ? ['require', 'exports'] : []),
          executionBody
        );
        const requireModule = (name: string) => {
          if (!modules || !Object.prototype.hasOwnProperty.call(modules, name))
            throw new Error(`Unsupported example import: ${name}`);
          return modules[name];
        };
        const result = evaluatedFunc(
          ...scopeValues,
          ...(modules ? [requireModule, {}] : [])
        );

        if (cancelled) return;

        if (typeof result === 'function') {
          setRenderedElement(
            React.createElement(result as React.ComponentType)
          );
        } else if (React.isValidElement(result)) {
          setRenderedElement(result);
        } else if (
          result === null ||
          result === undefined ||
          typeof result === 'string' ||
          typeof result === 'number' ||
          typeof result === 'boolean'
        ) {
          setRenderedElement(result as React.ReactNode);
        } else {
          throw new Error(
            'The evaluated code did not return a renderable React component, element, or primitive value.'
          );
        }
        setError(null);
      } catch (e: any) {
        if (cancelled) return;
        console.error('Error in CustomLiveCode:', e);
        let errorMessage = `Error: ${e.message}`;
        if (e.loc) {
          errorMessage += ` (Line: ${e.loc.line}, Column: ${e.loc.column})`;
        }
        if (e.stack) {
          errorMessage += `\nStack: ${e.stack.substring(0, 500)}...`;
        }

        errorMessage += `\n\n--- Original Code (from MDX) ---\n${sourceRef.current.substring(
          0,
          500
        )}...`;
        if (code !== sourceRef.current) {
          errorMessage += `\n\n--- Processed Code (passed to Babel) ---\n${code.substring(
            0,
            500
          )}...`;
        }
        if (transpiledCode) {
          errorMessage += `\n\n--- Transpiled Code (Babel output) ---\n${transpiledCode.substring(
            0,
            500
          )}...`;
        }
        setError(errorMessage);
        setRenderedElement(null);
      }
    };

    transpileAndRun();

    return () => {
      cancelled = true;
    };
  }, [code, scope, mainComponentName, hasCompiledPreview, modules]);

  const preview =
    !mounted || isLoadingBabel ? (
      <p className="docs-example-message" role="status">
        Loading preview…
      </p>
    ) : error ? (
      <div className="docs-example-error" role="alert">
        <strong>This example could not be rendered.</strong>
        <p>
          The code is still available. You can also use the component's Examples
          page.
        </p>
        <details>
          <summary>Error details</summary>
          <pre>{error}</pre>
        </details>
      </div>
    ) : (
      <ExampleBoundary key={code}>
        {compiledPreview ?? renderedElement}
      </ExampleBoundary>
    );
  return (
    <div className="docs-example">
      <div className="docs-example-toolbar">
        <span>INTERACTIVE EXAMPLE</span>
        <CopyCode code={originalCode} />
      </div>
      <div
        className="docs-example-view-controls"
        role="group"
        aria-label="Example view"
      >
        <Button
          size="sm"
          variant={activeView === 'preview' ? 'filled' : 'ghost'}
          aria-pressed={activeView === 'preview'}
          onClick={() => setActiveView('preview')}
        >
          Preview
        </Button>
        <Button
          size="sm"
          variant={activeView === 'code' ? 'filled' : 'ghost'}
          aria-pressed={activeView === 'code'}
          onClick={() => setActiveView('code')}
        >
          Code
        </Button>
      </div>
      {activeView === 'preview' ? (
        <div className="docs-example-preview">{preview}</div>
      ) : null}
      <pre
        className="docs-example-code"
        tabIndex={0}
        hidden={activeView !== 'code'}
        data-language={language}
      >
        <HighlightedCode code={originalCode} language={language} />
      </pre>
    </div>
  );
};

export class ExampleBoundary extends React.Component<
  { children: React.ReactNode; resetKey?: unknown },
  { error: string; resetKey?: unknown }
> {
  state = { error: '', resetKey: this.props.resetKey };
  static getDerivedStateFromProps(
    props: { resetKey?: unknown },
    state: { resetKey?: unknown }
  ) {
    return props.resetKey !== state.resetKey
      ? { error: '', resetKey: props.resetKey }
      : null;
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    if (this.state.error)
      return (
        <div className="docs-example-error" role="alert">
          <strong>This example needs an update.</strong>
          <p>{this.state.error}</p>
          <p>Open the Code tab or the component's Examples page to continue.</p>
        </div>
      );
    return this.props.children;
  }
}

export default CustomLiveCode;
