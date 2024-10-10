import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Horizontal, Vertical } from '../../components';
import { loadDocs } from '../../docsLoader';
import { MDXProvider } from '@mdx-js/react';
import { SideMenu } from './components/docs.elements';

const components = {
  // Mappez les éléments Markdown aux composants de app-studio
  // h1: (props: any) => <h1 {...props} />,
  // p: (props: any) => <p {...props} />,
  // Ajoutez d'autres mappings si nécessaire
};

const DocsPage = () => {
  const { componentName } = useParams();

  const [docs, setDocs] = useState<any>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const loadedDocs = await loadDocs();
      setDocs(loadedDocs);
    };

    fetchDocs();
  }, []);

  // Trouver le document correspondant au composant
  const doc = docs.find(
    (d: any) => d.componentName.toLowerCase() === componentName?.toLowerCase()
  );

  if (!doc) {
    return <div>Documentation non trouvée pour {componentName}</div>;
  }

  const { DocComponent } = doc;

  return (
    <Horizontal>
      <SideMenu docs={docs} />
      <Vertical flex={1}>
        <MDXProvider components={components}>
          {/* <DocComponent /> */}
        </MDXProvider>
      </Vertical>
    </Horizontal>
  );
};

export default DocsPage;
