import React, { memo } from 'react';
import type { RootContent } from 'hast';
import { refractor } from 'refractor/core';
import tsx from 'refractor/tsx';
import css from 'refractor/css';
import json from 'refractor/json';
import bash from 'refractor/bash';
import './syntax.css';

for (const syntax of [tsx, css, json, bash]) refractor.register(syntax);

function renderToken(node: RootContent, key: number): React.ReactNode {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return null;
  const classes = node.properties.className;
  return (
    <span
      key={key}
      className={Array.isArray(classes) ? classes.join(' ') : undefined}
    >
      {node.children.map(renderToken)}
    </span>
  );
}

export const HighlightedCode = memo(function HighlightedCode({
  code,
  language = 'tsx',
}: {
  code: string;
  language?: string;
}) {
  return (
    <code className="syntax-code" data-language={language}>
      {refractor.registered(language)
        ? refractor.highlight(code, language).children.map(renderToken)
        : code}
    </code>
  );
});
