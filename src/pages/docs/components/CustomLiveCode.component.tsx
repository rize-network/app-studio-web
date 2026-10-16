// File: src/pages/docs/components/CustomLiveCode.component.tsx
import React, { useState, useEffect, useRef, Fragment } from 'react';
import type { BabelFileResult, TransformOptions } from '@babel/standalone';
import { View, Text } from 'app-studio';

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
}

const CustomLiveCode: React.FC<CustomLiveCodeProps> = ({
  code,
  originalCode,
  scope,
  language = 'jsx',
  mainComponentName,
}) => {
  const [renderedElement, setRenderedElement] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingBabel, setIsLoadingBabel] = useState(false);

  useEffect(() => {
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
        };

        const babelResult: BabelFileResult | null = transform(
          code,
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
        if (mainComponentName) {
          executionBody = `
          ${transpiledCode};
          if (typeof ${mainComponentName} !== 'undefined') {
            return ${mainComponentName};
          } else {
            const allDefined = this;
            if (allDefined && typeof allDefined['${mainComponentName}'] !== 'undefined') {
                return allDefined['${mainComponentName}'];
            }
            for (const key in allDefined) {
                if (typeof allDefined[key] === 'function' && key !== 'React' && key !== 'Fragment' && !scopeKeys.includes(key)) {
                    console.warn("Fallback: Rendering first available function found in code: ", key);
                    return allDefined[key];
                }
            }
            throw new Error("Component '${mainComponentName}' was not defined or found in the provided code.");
          }
        `;
        } else {
          executionBody = `return (${transpiledCode});`;
        }

        const evaluatedFunc = new Function(...scopeKeys, executionBody);
        const result = evaluatedFunc.apply({}, scopeValues);

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

        errorMessage += `\n\n--- Original Code (from MDX) ---\n${originalCode.substring(
          0,
          500
        )}...`;
        if (code !== originalCode) {
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
  }, [code, originalCode, scope, mainComponentName]);

  // Basic styling for the component parts. Customize as needed.
  const containerStyle: React.CSSProperties = {
    margin: '1em 0',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
  };
  const headerStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const headerTextStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '0.9em',
    fontWeight: '600',
    color: '#333',
  };
  const codeBlockStyle: React.CSSProperties = {
    backgroundColor: '#2d2d2d',
    color: '#f8f8f2',
    padding: '12px',
    fontSize: '0.85em',
    overflowX: 'auto',
    fontFamily: 'monospace',
    maxHeight: '300px',
  };
  const preStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  };
  const previewStyle: React.CSSProperties = {
    padding: '15px',
    borderTop: '1px solid #e0e0e0',
    minHeight: '40px',
  };
  const errorStyle: React.CSSProperties = {
    color: '#d8000c',
    backgroundColor: '#ffeded',
    padding: '10px',
    whiteSpace: 'pre-wrap',
    fontSize: '0.85em',
    borderRadius: '3px',
    fontFamily: 'monospace',
    overflowX: 'auto',
  };

  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <Text as="h4" style={headerTextStyle}>
          Live Example
        </Text>
        {mainComponentName && (
          <Text style={{ fontSize: '0.8em', color: '#666' }}>
            Rendering: {mainComponentName}
          </Text>
        )}
      </View>
      <View style={codeBlockStyle}>
        <pre style={preStyle}>
          <code>{originalCode}</code> {/* Show original code from MDX */}
        </pre>
      </View>
      <View style={previewStyle}>
        {isLoadingBabel ? (
          <Text style={{ color: '#666', fontStyle: 'italic' }}>
            Loading transpiler...
          </Text>
        ) : error ? (
          <pre style={errorStyle}>{error}</pre>
        ) : (
          renderedElement
        )}
      </View>
    </View>
  );
};

export default CustomLiveCode;
