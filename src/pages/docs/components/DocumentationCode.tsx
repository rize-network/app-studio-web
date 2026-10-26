import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as AppStudio from 'app-studio';
import * as Components from 'src/components';
import { CopyCode } from 'src/pages/marketing/MarketingLayout';
import CustomLiveCode from './CustomLiveCode.component';
import { HighlightedCode } from 'src/pages/code/HighlightedCode';

const scope = { ...AppStudio, ...Components, ...React, React, Formik };

export function prepareExample(source: string) {
  if (!/<[A-Za-z]/.test(source)) return null;
  let code = source
    .replace(/^\s*import[\s\S]*?from\s*['"][^'"]+['"];?/gm, '')
    .replace(/^\s*import\s*['"][^'"]+['"];?/gm, '')
    .trim();
  const defaultName = code.match(
    /export\s+default\s+(?:async\s+)?(?:function|class)\s+(\w+)/
  )?.[1];
  let name =
    defaultName ||
    code.match(
      /export\s+(?:async\s+)?(?:const|let|var|function|class)\s+(\w+)/
    )?.[1] ||
    code.match(/(?:function|const|let|var)\s+([A-Z]\w*)/)?.[1] ||
    null;
  if (defaultName) code = code.replace(/export\s+default\s+/, '');
  else if (/export\s+default\s+/.test(code)) {
    name = '__DocumentationExample';
    code = code.replace(
      /export\s+default\s+/,
      'const __DocumentationExample = '
    );
  }
  code = code
    .replace(
      /\bexport\s+(?=(?:async\s+)?(?:const|let|var|function|class)\b)/g,
      ''
    )
    .replace(/^\s*export\s*\{[\s\S]*?\}\s*;?/gm, '')
    .trim();
  return { code, name };
}

export function DocumentationCode({ className = '', children, ...props }: any) {
  if (!className) return <code {...props}>{children}</code>;
  const original = typeof children === 'string' ? children.trim() : '';
  const language = className.replace('language-', '');
  const example = ['tsx', 'jsx', 'typescript', 'javascript'].includes(language)
    ? prepareExample(original)
    : null;
  if (example)
    return (
      <CustomLiveCode
        code={example.code}
        originalCode={original}
        mainComponentName={example.name}
        language={language}
        scope={scope}
      />
    );
  return (
    <div className="docs-static-code">
      <div>
        <span>{language}</span>
        <CopyCode code={original} />
      </div>
      <pre tabIndex={0} data-language={language}>
        <HighlightedCode code={original} language={language} />
      </pre>
    </div>
  );
}

export const documentationMdxComponents = {
  code: DocumentationCode,
  pre: ({ children }: any) => <div className="docs-code-block">{children}</div>,
  a: ({ href = '', children, ...props }: any) =>
    href.startsWith('/') ? (
      <Link
        to={href}
        reloadDocument={/\.(md|txt)(?:[?#]|$)/.test(href)}
        {...props}
      >
        {children}
      </Link>
    ) : (
      <a href={href} {...props}>
        {children}
      </a>
    ),
};
