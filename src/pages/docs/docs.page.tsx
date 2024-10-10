import React, { useEffect, useState } from 'react';
import { View, Text } from 'app-studio';
import { useParams } from 'react-router-dom';
import { Alert, Horizontal, Loader, Vertical } from '../../components';
import { loadDocs } from '../../docsLoader';
import { SideMenu } from './components/docs.elements';
import { MarkdownEditor } from './components/MarkdownEditor.component';
import LiveCode from './components/LiveCode.component';
import { MDXProvider } from '@mdx-js/react';
import MDXRuntime from '@mdx-js/mdx';
import { compile } from '@mdx-js/mdx';

import '@mdxeditor/editor/style.css';

const DocsPage = () => {
  const { componentName } = useParams();
  const components = {
    code: (props: any) => {
      const { className = '', children } = props;
      const language = className.replace('language-', '');
      return <LiveCode code={children} language={language} scope={{ Alert }} />;
    },
  };

  const [docs, setDocs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<any>('');

  useEffect(() => {
    const fetchDocs = async () => {
      const loadedDocs = await loadDocs();
      setDocs(loadedDocs);
    };

    fetchDocs();
  }, []);

  useEffect(() => {
    const fetchDoc = async () => {
      const doc = docs.find(
        (d: any) =>
          d.componentName.toLowerCase() === componentName?.toLowerCase()
      );

      if (doc) {
        setIsLoading(true);
        const response = await fetch(doc.path);
        const text = await response.text();
        const compiled = await compile(text);
        setText(compiled);
        setIsLoading(false);
      }
    };

    fetchDoc();
  }, [componentName]);

  return (
    <Horizontal height="100%" overflowY="auto">
      <SideMenu docs={docs} flex={1} />
      <Vertical flex={5} padding="5px 10px">
        {!isLoading ? (
          <MDXProvider components={components}>
            {/* <MarkdownEditor key={new Date().getTime()} markdown={text} /> */}
            {/* <MDXRuntime>{text}</MDXRuntime> */}
            {/* <LiveCode code={code} scope={{ Alert }} /> */}
          </MDXProvider>
        ) : (
          <Loader />
        )}
      </Vertical>
    </Horizontal>
  );
};

export default DocsPage;
