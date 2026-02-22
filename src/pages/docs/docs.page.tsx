// File: src/pages/docs/docs.page.tsx
import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import * as AppComponents from '../../components';
import { Horizontal, Vertical, View } from 'app-studio';
import * as AppStudioComponents from 'app-studio';

import { loadDocs } from '../../docsLoader';
// Correct way to import for MDX
import mdxRuntime from 'react/jsx-runtime'; // Use a specific alias
import { MDXProvider } from '@mdx-js/react';
import { evaluate } from '@mdx-js/mdx';

import { SideMenu } from './components/docs.elements';
import CustomLiveCode from './components/CustomLiveCode.component';

const DocsPage = () => {
  const { componentName } = useParams<{ componentName: string }>();

  // ... (mdxComponents definition remains the same as the previous full code example)
  const mdxComponents = {
    code: (props: any) => {
      const { className = '', children, ...restProps } = props;

      if (typeof children !== 'string') {
        if (restProps.hasOwnProperty('metastring')) {
          console.warn(
            'CustomLiveCode: children is not a string. Rendering as static pre.',
            children
          );
          return <pre className={className}>{children}</pre>;
        }
        return <code className={className}>{children}</code>;
      }

      const languageMatch = className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : 'plaintext';

      const interactiveLanguages = ['jsx', 'tsx', 'javascript', 'typescript'];
      if (!interactiveLanguages.includes(language)) {
        return (
          <pre className={className}>
            <code className={className}>{children.trim()}</code>
          </pre>
        );
      }

      const originalCodeTrimmed = children.trim();
      let codeToTranspile = originalCodeTrimmed;
      let mainComponentNameFromExport: string | null = null;

      codeToTranspile = codeToTranspile
        .replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
        .trim();

      const componentExportRegex =
        /export\s+(?:const|let|var|function|class)\s+([A-Za-z_][A-Za-z0-9_]*)/;
      const exportMatch = codeToTranspile.match(componentExportRegex);

      if (exportMatch && exportMatch[1]) {
        mainComponentNameFromExport = exportMatch[1];
        codeToTranspile = codeToTranspile.replace(
          componentExportRegex,
          (match) => match.substring('export '.length)
        );
      }

      codeToTranspile = codeToTranspile.replace(
        /^\s*export\s+default\s+/gm,
        ''
      );
      codeToTranspile = codeToTranspile.replace(
        /^\s*export\s*{[\s\S]*?}\s*(?:from\s+['"][^'"]+['"])?;?/gm,
        ''
      );
      codeToTranspile = codeToTranspile.trim();

      if (!codeToTranspile) {
        return (
          <pre className={className}>
            <code>{originalCodeTrimmed}</code>
          </pre>
        );
      }

      return (
        <CustomLiveCode
          code={codeToTranspile}
          originalCode={originalCodeTrimmed}
          mainComponentName={mainComponentNameFromExport}
          language={language}
          scope={{
            React,
            ...React,
            ...AppComponents,
            ...AppStudioComponents,
          }}
        />
      );
    },
    pre: (props: any) => <pre {...props} />,
  };

  const [docs, setDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const [errorInfo, setErrorInfo] = useState<{
    message: string;
    details?: string;
    mdxContent?: string;
  } | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const loadedDocs = await loadDocs();
        setDocs(loadedDocs);
      } catch (err) {
        console.error('Failed to load docs list:', err);
        setErrorInfo({ message: 'Failed to load documentation list.' });
      }
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!componentName || !docs || docs.length === 0) {
        return;
      }

      const doc = docs.find(
        (d: any) =>
          d.componentName.toLowerCase() === componentName?.toLowerCase()
      );

      if (doc) {
        setIsLoading(true);
        setErrorInfo(null);
        setContent(null);
        try {
          const response = await fetch(doc.path);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch MDX file: ${response.status} ${response.statusText} for ${doc.path}`
            );
          }
          const text = await response.text();

          // console.log('Evaluating MDX for:', componentName);
          // console.log('MDX text preview:', text.substring(0, 200) + '...');

          // --- START OF FIX ---
          const evaluateOptions = {
            // Spread the imported runtime (which contains jsx, jsxs, Fragment)
            ...(mdxRuntime as any), // Cast to any if TypeScript complains about spreading
            // Explicitly provide Fragment if not already in mdxRuntime or if evaluate needs it separately
            Fragment: Fragment,
            // Pass the mdxComponents map
            useMDXComponents: () => mdxComponents,
            // Set development mode based on environment
            development: process.env.NODE_ENV === 'development',
          };

          // If in development, ensure jsxDEV is provided.
          // In production, jsx is used.
          if (process.env.NODE_ENV === 'development') {
            if (!evaluateOptions.jsxDEV) {
              // console.warn("jsxDEV not found in mdxRuntime, attempting to use mdxRuntime.jsx as jsxDEV. This might not be ideal.");
              // This is a common fallback if jsxDEV isn't explicitly separate in your runtime bundle.
              // Ideally, your build setup should provide jsxDEV correctly.
              evaluateOptions.jsxDEV =
                (mdxRuntime as any).jsxDEV || (mdxRuntime as any).jsx;
            }
          } else {
            if (!evaluateOptions.jsx) {
              // console.warn("jsx not found in mdxRuntime, this is unexpected for production.");
              evaluateOptions.jsx = (mdxRuntime as any).jsx;
            }
          }
          // --- END OF FIX ---

          const evaluatedMdx = await evaluate(text, evaluateOptions);

          if (
            typeof evaluatedMdx.default !== 'function' &&
            typeof evaluatedMdx.default !== 'object'
          ) {
            console.error(
              'Evaluated MDX did not return a valid component:',
              evaluatedMdx.default
            );
            throw new Error(
              'MDX evaluation resulted in an invalid component type.'
            );
          }

          setContent(() => evaluatedMdx.default);
        } catch (error: any) {
          console.error(
            `Error processing MDX for ${componentName} (${doc.path}):`,
            error
          ); // Log path
          const errorDetails =
            error.stack ||
            error.message +
              (error.location
                ? ` (Line: ${error.location.line}, Column: ${error.location.column})`
                : '');
          let mdxPreview = 'Could not fetch MDX content for error display.';
          if (doc.path) {
            try {
              const errorMdxResponse = await fetch(doc.path);
              if (errorMdxResponse.ok) {
                mdxPreview = (await errorMdxResponse.text()).substring(0, 1000);
              }
            } catch (fetchErr) {
              console.error('Could not fetch MDX for error preview:', fetchErr);
            }
          }
          setErrorInfo({
            message:
              error.message ||
              'An unknown error occurred during MDX processing.',
            details: errorDetails,
            mdxContent: mdxPreview,
          });
          setContent(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        if (docs.length > 0 && componentName) {
          // Only show "not found" if docs are loaded
          setErrorInfo({
            message: `Documentation for "${componentName}" not found.`,
          });
        }
        setContent(null);
        setIsLoading(false);
      }
    };

    fetchDoc();
  }, [docs, componentName]); // mdxComponents is stable in this context

  // ... (renderErrorDisplay and return statement remain the same as the previous full code example)
  const renderErrorDisplay = () => {
    if (!errorInfo) return null;
    return (
      <div
        style={{
          padding: '20px',
          border: '1px solid red',
          backgroundColor: '#fff0f0',
          margin: '10px',
          fontFamily: 'monospace',
          color: '#333',
        }}
      >
        <h3>Error loading documentation for {componentName}</h3>
        <p>
          <strong>Error:</strong> {errorInfo.message}
        </p>
        {errorInfo.details && (
          <details>
            <summary>Full error details</summary>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
                background: '#f9f9f9',
                padding: '10px',
              }}
            >
              {errorInfo.details}
            </pre>
          </details>
        )}
        {errorInfo.mdxContent && (
          <details>
            <summary>MDX content (first 1000 chars)</summary>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
                background: '#f9f9f9',
                padding: '10px',
              }}
            >
              {errorInfo.mdxContent}...
            </pre>
          </details>
        )}
      </div>
    );
  };

  return (
    <Horizontal height="100%" overflowY="auto">
      <SideMenu docs={docs} flex={1} />
      <Vertical flex={5} padding="5px 10px" style={{ overflowY: 'auto' }}>
        {isLoading &&
          (AppComponents.Loader ? <AppComponents.Loader /> : <p>Loading...</p>)}
        {!isLoading && errorInfo && renderErrorDisplay()}
        {!isLoading && !errorInfo && Content && (
          <MDXProvider components={mdxComponents}>
            <View
              width={'100%'}
              style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}
            >
              <Content />
            </View>
          </MDXProvider>
        )}
        {!isLoading &&
          !errorInfo &&
          !Content &&
          componentName &&
          !docs.find(
            (d) =>
              d.componentName.toLowerCase() === componentName?.toLowerCase()
          ) &&
          docs.length > 0 && (
            <p>
              Documentation for {componentName} not found. Please check the
              component name.
            </p>
          )}
        {!isLoading &&
          !errorInfo &&
          !Content &&
          !componentName &&
          docs.length > 0 && (
            <p>Select a component from the menu to view its documentation.</p>
          )}
      </Vertical>
    </Horizontal>
  );
};

export default DocsPage;
