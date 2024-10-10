import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Horizontal, Loader, Vertical } from '../../components';
import { loadDocs } from '../../docsLoader';
import { MDXProvider } from '@mdx-js/react';
import { SideMenu } from './components/docs.elements';

import '@mdxeditor/editor/style.css';
import { MarkdownEditor } from './components/editor.component';

const DocsPage = () => {
  const { componentName } = useParams();

  const [docs, setDocs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchDocs = async () => {
      const loadedDocs = await loadDocs();
      setDocs(loadedDocs);
    };

    fetchDocs();
    fetchDoc();
  }, []);

  const fetchDoc = async () => {
    const doc = docs.find(
      (d: any) => d.componentName.toLowerCase() === componentName?.toLowerCase()
    );

    if (doc) {
      setIsLoading(true);
      const response = await fetch(doc.path);
      const text = await response.text();
      setText(text);
      setIsLoading(false);
    }
  };

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
        setText(text);
        setIsLoading(false);
      }
    };

    fetchDoc();
  }, [componentName]);

  return (
    <Horizontal height="100%" overflowY="auto" overflow={'hidden'}>
      <SideMenu docs={docs} flex={1} />
      <Vertical flex={5} padding="5px 10px">
        {!isLoading ? (
          <MarkdownEditor key={text} markdown={text} />
        ) : (
          <Loader />
        )}
      </Vertical>
    </Horizontal>
  );
};

export default DocsPage;
