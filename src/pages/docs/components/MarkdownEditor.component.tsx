import React from 'react';

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  frontmatterPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  SandpackConfig,
  sandpackPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const plugins = [
  imagePlugin(),
  quotePlugin(),
  headingsPlugin(),
  listsPlugin(),
  linkPlugin(),
  frontmatterPlugin(),
  linkDialogPlugin(),
  markdownShortcutPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
  sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: { js: 'JavaScript', css: 'CSS', tsx: 'TypeScript' },
  }),
];

export const MarkdownEditor = ({ markdown }: { markdown: string }) => {
  return <MDXEditor markdown={markdown} plugins={plugins} />;
};
